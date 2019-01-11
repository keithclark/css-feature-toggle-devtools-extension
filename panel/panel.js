import grid from './features/grid.js';
import flexbox from './features/flexbox.js';
import boxSizing from './features/box-sizing.js';
import sticky from './features/sticky.js';
import transforms from './features/transforms.js';
import supports from './features/supports.js';
import compositing from './features/compositing.js';
import clipPath from './features/clip-path.js';
import shape from './features/shape.js';
import objectFit from './features/object-fit.js';


let features = [
  grid,
  flexbox,
  boxSizing,
  sticky,
  transforms,
  compositing,
  clipPath,
  shape,
  supports,
  objectFit
];


const optionsTemplate = document.getElementById('option');
const optionGroupsTemplate = document.getElementById('optionGroup');
const containerOptions = document.getElementById('optionsContainer');


/**
 * Applies the extension settings to the currently inspected document.
 */
const updateDocument = () => {
  updateDocumentStylesheets();
  updateDocumentStyleElements();
}


/**
 * Applies the current extension settings to any stylesheet resources
 */
const updateDocumentStylesheets = () => {
  chrome.devtools.inspectedWindow.getResources(resources => {
    resources.forEach(resource => {
      if (resource.type === 'stylesheet') {
        updateStylesheet(resource);
      }
    });
  });
}


/**
 * Updates the cssText of the passed stylesheet resource
 * 
 * @param {*} resource 
 */
const updateStylesheet = resource => {
  resource.getContent(content => {
    let newContent = updateCssText(content);
    if (newContent !== content) {
      resource.setContent(newContent, true);
    }
  });
}


/**
 * Update the passed CSS text with the relvant settings
 * 
 * @param {*} resource 
 */
const updateCssText = cssText => {
  features.forEach(feature => {
    if (feature.disabled) {
      cssText = feature.disable(cssText);
    } else {
      cssText = feature.enable(cssText);
    }
  });
  return cssText;
}


/**
 * Encodes the passed CSS text
 * 
 * @param {string} cssText 
 */
const encodeCssText = (cssText = '') => {
  return cssText.replace(/\\/g,'\\\\').replace(/`/g, '\\`');
}


/** 
 * Retrives the cssText of each <style> element using either the textContent
 * property or, in the case of JS injected style rules, by walking the CSSOM
 * and retreiving the `cssText` property of each style rule. This function is
 * converted to a string and evaluated in the inspected document.
 */
const getCssText = () => {
  return Array.from(document.querySelectorAll("style")).map(style => {
    if (style.textContent) {
      return style.textContent;
    }
    return Array.from(style.sheet.cssRules).map(rule => rule.cssText).join('');
  });
};


/**
 * Sets the textContent of every <style> using the passed CSS text. This 
 * function is converted to a string and evaluated in the inspected document.
 * 
 * @param {*} styles 
 */
const setCssText = styles => {
  document.querySelectorAll("style").forEach(style => {
    let newStyles = styles.shift();
    if (newStyles !== style.textContent) {
      style.textContent = newStyles;
    }
  });
};


/**
 * Updates <style> elements of the current document.
 */
const updateDocumentStyleElements = () => {

  // Due to a bug with the web extension polyfill, we can't use the promise-enabled
  // `browser.devtools.inspectedWindow.eval()` call here so we need to use the `chrome`
  // https://github.com/mozilla/webextension-polyfill/issues/168
  let inspectedWindow = chrome.devtools.inspectedWindow;
  inspectedWindow.eval(`(${getCssText})()`, (res, ex) => {
    res = res.map(encodeCssText).map(updateCssText);
    inspectedWindow.eval(`(${setCssText})([\`${res.join('\`,\`')}\`])`);
  });
  
  // When the bug is fixed, this code should do the job
  /*
  browser.devtools.inspectedWindow.eval(`(${getCssText})()`).then(result => {
    let styles = result[0];
    if (styles) {
      styles = styles.map(encodeCssText).map(updateCssText);
      chrome.devtools.inspectedWindow.eval(`(${setCssText})([\`${styles.join('\`,\`')}\`])`);
    }
  });
  */
};


const allFeaturesEnabled = () => features.every(feature => !feature.disabled);


/**
 * Creates UI options
 */
const createOptions = () => {

  let optionGroups = {};


  features.forEach((feature, i) => {
    let optionTemplate = document.importNode(optionsTemplate.content, true);
    let id = `feature-${i}`;
    let inputElem = optionTemplate.querySelector('input');
    let labelElem = optionTemplate.querySelector('label');
    let nameElem = optionTemplate.querySelector('.option__name');
    let helpElem = optionTemplate.querySelector('.option__help');
    let group = feature.group || 'Default';
    
    nameElem.textContent = feature.name;
    helpElem.textContent = feature.help;
    labelElem.setAttribute('for', id);
    inputElem.setAttribute('id', id);
    inputElem.addEventListener('click', () => {
      let onResourceAdded = browser.devtools.inspectedWindow.onResourceAdded;

      if (inputElem.checked && allFeaturesEnabled()) {
        onResourceAdded.addListener(resourceAddedListener);
      }

      feature.disabled = inputElem.checked;

      if (!inputElem.checked && allFeaturesEnabled()) {
        onResourceAdded.removeListener(resourceAddedListener);
      }

      updateDocument();

    });


    if (!optionGroups[group]) {
      let optionGroupTemplate = document.importNode(optionGroupsTemplate.content, true);
      optionGroupTemplate.querySelector('.optionGroup__name').textContent = group;
      optionGroups[group] = optionGroupTemplate
    }

    optionGroups[group].querySelector('.optionGroup__options').appendChild(optionTemplate)

  });

  Object.values(optionGroups).forEach(group => containerOptions.appendChild(group));

}


/**
 * Refreshes the UI with the current theme
 */
const updateTheme = () => {
  document.body.classList.add(`theme--${browser.devtools.panels.themeName}`);
}


/**
 * Event handler for `onResourceAdded`, which is dynamically bound when the user
 * sets/unsets any of the panel options
 * 
 * @param {*} resource 
 */
const resourceAddedListener = resource => {
  if (resource.type === 'document') {
    // If the top-level document has changed then we need to update any inline
    // <style> elements.
    chrome.tabs.get(browser.devtools.inspectedWindow.tabId, tab => {
      if (tab.url === resource.url) {
        updateDocumentStyleElements();
      }
    });
  } else if (resource.type === 'stylesheet') {
    // If the resource is a stylesheet we need to update its content to reflect
    // the current settings.
    updateStylesheet(resource);
  }
}


/**
 * Initialise the extension
 */
const init = () => {

  updateTheme();

  // Chrome 71 doesn't support the `onThemeChanged` event as it restarts devtools
  // when the user changes theme.
  if ('onThemeChanged' in browser.devtools.panels) {
    browser.devtools.panels.onThemeChanged.addListener(updateTheme);
  }

  // Firefox 64 doesn't support the `onResourceAdded` event so we can't start
  // the extension.
  if ('onResourceAdded' in browser.devtools.inspectedWindow) {
    createOptions();
  }
}


init();
