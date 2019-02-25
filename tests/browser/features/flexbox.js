/**
 * Test the `flex` value for the `display` property. This test creates a greem
 * pseudo-element and applies flex to ensure it fills the parent element space. 
 * If the browser doesn't support `flex`, the red coloured parent element will
 * show.
 */
addTest({
  name: 'flex',
  group: 'Flexbox',
  css: `<indicator-selector> {
      display: flex;
    }
    <indicator-selector>::before {
      content: '';
      flex: 1;
      background: <supported-color>
    }`
});

/**
 * Test the `inline-flex` value for the `display` property. The test works in
 * the same way as the `flex` test above.
 */
addTest({
  name: 'inline-flex',
  group: 'Flexbox',
  css: `<indicator-selector> {
      display: inline-flex;
    }
    <indicator-selector>::before {
      content: '';
      flex: 1;
      background: <supported-color>
    }`
});

/**
 * test for `-webkit-flex` prefix
 */
addTest({
  name: '-webkit-flex',
  group: 'Flexbox',
  css: `<indicator-selector> {
      display: -webkit-flex;
    }
    <indicator-selector>::before {
      content: '';
      flex: 1;
      background: <supported-color>
    }`
});

/**
 * test for `-webkit-inline-flex` prefix
 */
addTest({
  name: '-webkit-inline-flex',
  group: 'Flexbox',
  css: `<indicator-selector> {
      display: -webkit-inline-flex;
    }
    <indicator-selector>::before {
      content: '';
      flex: 1;
      background: <supported-color>
    }`
});

/**
 * test for old `box` formats
 */
addTest({
  name: '-webkit-box',
  group: 'Flexbox',
  css: `<indicator-selector> {
      display: -webkit-box;
    }
    <indicator-selector>::before {
      content: '';
      display: block;
      -webkit-box-flex: 1;
      background: <supported-color>;
    }`
});

addTest({
  name: '-webkit-inline-box',
  group: 'Flexbox',
  css: `<indicator-selector> {
      display: -webkit-inline-box;
    }
    <indicator-selector>::before {
      content: '';
      display: block;
      -webkit-box-flex: 1;
      background: <supported-color>;
    }`
});
