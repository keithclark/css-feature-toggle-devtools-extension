import {
  getStyleElementCssText,
  setStyleElementCssText,
  isDocumentComplete
} from './content-functions.js';


/**
 * Returns a list of resources for the inspected window.
 * 
 * @returns {Promise} A promise that resolves with an array resources.
 */
const getResourcesByType = resourceType => {
  return new Promise(resolve => {
    chrome.devtools.inspectedWindow.getResources(resources => {
      resolve(resources.filter(resource => resource.type === resourceType));
    });
  });
};


/**
 * Returns a list of stylesheet resources for the inspected window.
 * 
 * @returns {Promise} A promise that resolves with an array of stylesheet
 * resources.
 */
export const getStylesheets = () => getResourcesByType('stylesheet');


/**
 * Returns a list of document resources for the inspected window.
 * 
 * @returns {Promise} A promise that resolves with an array of document
 * resources.
 */
export const getDocuments = () => getResourcesByType('document');


/**
 * Evalulates a expression in a document.
 * 
 * @param {string|function} expression - Expression or function to evaluate
 * @param {Resource} resource - Document to evaluate the expression in
 * @returns {Promise} A promise that resolves with the expression result
 */
export const evalInDocument = (expression, resource) => {
  let options = {
    frameURL: resource.url
  };

  if (typeof expression === 'function') {
    expression = `(${expression})()`;
  }

  return new Promise(resolve => {
    chrome.devtools.inspectedWindow.eval(expression, options, (res, err) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};


/**
 * Waits for a document resource to complete loading.
 * 
 * @param {Resource} resource - The document to wait for
 * @returns {Promise} A promise that resolves once the document is complete
 */
export const documentReady = resource => {
  return new Promise(resolve => {
    const checkReadyState = async () => {
      let res = await evalInDocument(isDocumentComplete, resource);
      if (!res) {
        setTimeout(checkReadyState, 100);
      } else {
        resolve();
      }
    };
    checkReadyState();
  });
};


/**
 * Extracts the CSS text for each <style> element of a document resource.
 * 
 * @param {Resource} resource - Document to extract the styles from
 * @returns {Promise} A promise that resolves with an array of cssText
 */
export const getStyleElementStyles = async resource => {
  await documentReady(resource);
  return evalInDocument(getStyleElementCssText, resource);
};


/**
 * Updates the CSS text for each <style> element of a document resource.
 * 
 * @param {Resource} resource - Document to extract the styles from
 * @param {string[]} styles - CSS text to apply
 * @returns {Promise} A promise that resolves with an array of cssText
 */
export const setStyleElementStyles = (resource, styles) => {
  return evalInDocument(`(${setStyleElementCssText})([\`${styles.join('\`,\`')}\`])`, resource);
};
