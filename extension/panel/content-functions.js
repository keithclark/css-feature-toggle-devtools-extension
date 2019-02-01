/**
 * Retrives the cssText of each <style> element using either the textContent
 * property or, in the case of JS injected style rules, by walking the CSSOM
 * and retreiving the `cssText` property of each style rule.
 */
export const getStyleElementCssText = () => {
  return Array.from(document.querySelectorAll('style')).map(style => {
    if (style.textContent) {
      return style.textContent;
    }
    return Array.from(style.sheet.cssRules).map(rule => rule.cssText).join('');
  });
};


/**
 * Sets the textContent of every <style> using the passed CSS text
 *
 * @param {string} styles
 */
export const setStyleElementCssText = styles => {
  document.querySelectorAll('style').forEach(style => {
    let newStyles = styles.shift();
    if (newStyles !== style.textContent) {
      style.textContent = newStyles;
    }
  });
};


/**
 * Checks to see if the current document has finished loading
 *
 * @returns {boolean} true is the readyState is 'complete', otherwise false
 */
export const isDocumentComplete = () => {
  return document.readyState === 'complete';
};
