/**
 * Test the `box-sizing` property. This test creates a red-coloured
 * pseudo-element and sizes it to fill the space of the indicator element. The
 * pseudo-element is positioned off to the left, padding is applied and the
 * box-sizing attribute is set to border-box. If the browser doesn't support
 * box-sizing, the pseudo-element will double in size and cover the inidicator,
 * turning it red.
 */
addTest({
  name: 'box-sizing',
  group: 'Box Sizing',
  css: `<indicator-selector> {
    background: <supported-color>;
  }
  <indicator-selector>::before {
    content: '';
    display: block;
    box-sizing: border-box;
    background: <unsupported-color>;
    width: 100%;
    padding: 50%;
    margin-left:-100%;
  }`
});

/**
 * Same as `box-sizing`, but for browsers that support the -webkit prefix
 */
addTest({
  name: '-webkit-box-sizing',
  group: 'Box Sizing',
  css: `<indicator-selector> {
    background: <supported-color>;
  }
  <indicator-selector>::before {
    content: '';
    display: block;
    -webkit-box-sizing: border-box;
    background: <unsupported-color>;
    width: 100%;
    padding: 50%;
    margin-left:-100%;
  }`
});
