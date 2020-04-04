/**
 * This file "polyfills" the `getResources` method of `inspectedWindow`. This is
 * not a 1:1 polyfill - it does just enough to make this extension work and does
 * come with some caveats, which are detailed in the comments for each method.
 */

import { documentReady } from '../../../panel/resource-helpers.js';
import { Resource } from './Resource.js';


const contentMap = new WeakMap();
let resourceList;
let getResourcesPromise;
let getResourcesPromiseFromInspectedWindow;
let refreshTimer;


const writeStyles = `
((elem, cssText) => {
  let {sheet} = elem;
  while (sheet.rules.length) {
    sheet.deleteRule(0);
  }
  cssText.split(/\\n/g).reverse().forEach(rule => {
    sheet.insertRule(rule);
  });
})`;


const getResourcesScript = `
[...[...document.querySelectorAll("link[rel=stylesheet")].filter(elem => {
  return new URL(elem.href).origin === document.location.origin;
}).map(elem => {
  return {
    type: 'stylesheet',
    url: elem.href
  }
}), {
  type: 'document',
  url: document.URL
}];
`;


/**
 * It's not possible to access the raw content of a stylesheet so we have to
 * walk over the style rules using the CSSOM and reconstruct it ourselves.
 *
 * @param {Resource} resource
 */
const getStylesheetResourceContent = resource => {
  let expression = `[...[...document.querySelectorAll("link[rel=stylesheet")].filter(elem => elem.href=="${resource.url}")[0].sheet.rules].map(rule => rule.cssText.replace(/\\n/g,"")).join("\\n")`;
  return browser.devtools.inspectedWindow.eval(expression).then(([cssText, err]) => {
    if (err) {
      return Promise.reject(err);
    }
    return cssText;
  });
}


/**
 * Set the content of a stylesheet resource. Converts a string of CSS into a
 * series of style rules. The string MUST contain one rule per line (call
 * getStylesheetResourceContent() to get a valid string of rules.)
 *
 * @param {Resource} resource
 * @param {string} content
 * @returns {Promise}
 */
const setStylesheetResourceContent = (resource, content) => {
  let expression = `${writeStyles}([...document.querySelectorAll("link[rel=stylesheet")].filter(elem => elem.href=="${resource.url}")[0], "${content.replace(/["\\]/g,'\\$&').replace(/\n/g,'\\n')}")`;
  return browser.devtools.inspectedWindow.eval(expression);
}


/**
 * Retrieves the content of a resource. The Chromium implementation returns the
 * raw resource content. We don't have access to the raw data so must construct
 * it using browser APIs (i.e. CSSOM for stylesheets).
 *
 * Once content has been read, it is cached for subsequent lookups. See notes
 * in `setResourceContent` for caching info.
 *
 * @param {Resource} resource
 * @returns {Promise}
 */
export const getResourceContent = resource => {
  if (!contentMap.has(resource)) {
    let promise;
    if (resource.type === 'stylesheet') {
      promise = getStylesheetResourceContent(resource);
    } else {
      throw new Error(`Cannot get content for resource type "${resource.type}"`);
    }

    promise.then(content => {
      console.log(`[resourceContentProvider::getResourceContent] "${resource.name}" - ${content.length} bytes`);
    }).catch(() => {
      console.log(`[resourceContentProvider::getResourceContent] "${resource.name}" - error reading data`);
    });

    contentMap.set(resource, promise);
    return promise;
  }
  return contentMap.get(resource).then(content => {
    console.log(`[resourceContentProvider::getResourceContent] "${resource.name}" - ${content.length} bytes (cached)`);
    return content;
  });
}


/**
 * Sets content of a resource. The Chromium implementation sets the raw content
 * of the resource, triggering a re-parse and applying the results to the DOM.
 * Since we can set anything here, we need to make sure the content can be read
 * back verbatim by `Resource.getContent()`, which also uses raw content. This
 * means we need to cache the content and then apply changes using the relevant
 * APIs (i.e. CSSOM for stylesheets).
 *
 * Caching like this introduces issues with other devtools panels because they
 * can make their own modifications to content, leading to a divergence in
 * content. For now there's not much that can be done about this so it will be
 * documented as a warning.
 *
 * @param {*} resource
 * @param {*} content
 * @returns {Promise}
 */
export const setResourceContent = (resource, content) => {
  let promise;
  if (resource.type === 'stylesheet') {
    promise = setStylesheetResourceContent(resource, content);
  } else {
    throw new Error(`Cannot set content for resource type "${resource.type}"`);
  }

  promise.then(content => {
    console.log(`[resourceContentProvider::setResourceContent] "${resource.name}" - ${content.length} bytes`);
  }).catch(() => {
    console.log(`[resourceContentProvider::setResourceContent] "${resource.name}" - error writing data`);
  });

  return promise.then(() => {
    contentMap.set(resource, Promise.resolve(content));
  });
}


/**
 * Get all the resources from the inspected window by evaulating a script which
 * collects up DOM elements and maps them to a url and resource type. The result
 * of this method is cached for the life time of the devtools panel.
 *
 * After the first call, any newly added resources will be intercepted by
 * `network.onRequestFinished` and the cached resource list will be modified
 * accordingly.
 */
const getResourcesFromInspectedWindow = () => {
  if (!getResourcesPromiseFromInspectedWindow ) {
    getResourcesPromiseFromInspectedWindow = documentReady().then(() => {
      console.log('[getResourcesFromInspectedWindow] Looking for resources');
      return browser.devtools.inspectedWindow.eval(getResourcesScript).then(([resources]) => {
        getResourcesPromiseFromInspectedWindow  = null;
        return resources;
      });
    });
  }
  return getResourcesPromiseFromInspectedWindow;
}


/**
 * Returns a list of resources for the current document.
 *
 * @returns {Promise} — An array of Resource objects
 */
const getResources = () => {
  if (!getResourcesPromise) {
    getResourcesPromise = getResourcesFromInspectedWindow().then(resources => {
      console.log(`[getResources] Found ${resources.length} resources`)
      resourceList = new Map();
      resources.forEach(resource => {
        registerResource(new Resource(resource.type, resource.url));
      });
      return resourceList;
    });
  }
  return getResourcesPromise;
}


/**
 * Removes any cached resources that aren't in the currently inspected document
 */
const purgeResources = () => {
  console.log('[purgeResources]')
  return getResourcesFromInspectedWindow().then(resources => {
    Array.from(resourceList.values()).forEach(cachedResource => {
      if (!resources.find(resource => resource.url === cachedResource.url)) {
        unregisterResource(cachedResource);
      }
    });
  })
}


/**
 * Adds a resource to the current resource list
 *
 * @param {Resource} resource
 */
const registerResource = resource => {
  if (!resourceList.has(resource.url)) {
    resourceList.set(resource.url, resource);
    console.log(`[registerResource] Added ${resource.type} resource "${resource.name}". (Cache has ${resourceList.size} items)`);
  }
}


/**
 * Removes a resource from the current resource list
  *
 * @param {Resource} resource
 */
const unregisterResource = resource => {
  resourceList.delete(resource.url);
  console.log(`[unregisterResource] Removed ${resource.type} resource "${resource.name}". (Cache has ${resourceList.size} items)`);
}


/**
 * The polyfill method. Adds the `getResources` method to
 * `browser.devtools.inspectedWindow`
 */
export const polyfill = () => {

  browser.devtools.inspectedWindow.onResourceAdded.addListener(resource => {
    if (resourceList.has(resource.url)) {
      contentMap.delete(resource);
    } else {
      registerResource(resource);
    }

    if (!refreshTimer) {
      refreshTimer = setTimeout(() => {
        purgeResources();
        refreshTimer = null;
      }, 250);
    }
  });

  return callback => {
    return getResources().then(res => callback([...res.values()]));
  }

}
