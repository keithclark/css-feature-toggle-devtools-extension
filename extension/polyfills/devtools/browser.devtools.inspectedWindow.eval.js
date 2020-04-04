/**
 * Firefox doesn't support the `frameURL` property on `inspectedWindow.eval` so
 * we remove it here. The extension uses this property in Chrome to access
 * content in iframes. The Firefox version is restricted to the top-level
 * document so patching like this will prevent an exception without changing
 * functionality.
 */
try {
  browser.devtools.inspectedWindow.eval(';', {frameURL: ''});
} catch (error) {
  if (error.message === 'Type error for parameter options (Property "frameURL" is unsupported by Firefox) for devtools.inspectedWindow.eval.') {
    console.log('Patching "browser.devtools.inspectedWindow.eval" to work around lack of "frameURL" support');
    const inspectedWindowEval = browser.devtools.inspectedWindow.eval;

    browser.devtools.inspectedWindow.eval = (resource, options) => {
      if (options && options.frameURL) {
        delete options.frameURL;
      }
      return inspectedWindowEval(resource, options);
    }
  }
}
