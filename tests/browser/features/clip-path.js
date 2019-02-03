/**
 * This tests the `clip-path()` function. The test creates a red pseudo-element
 * that covers the green indicator element. If the browser supports clip-path,
 * the pseudo-element will be clipped allowing the green colour to show.
 */

 addTest({
  name: 'clip-path',
  group: 'Clipping',
  css: `<indicator-selector> {
    background: <supported-color>;
  }
  <indicator-selector>::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: <unsupported-color>;
    clip-path: inset(50%);
  }`
});

/**
 * Same as `clip-path()`, but for browsers that support the -webkit prefix
 */
addTest({
  name: '-webkit-clip-path',
  group: 'Clipping',
  css: `<indicator-selector> {
    background: <supported-color>;
  }
  <indicator-selector>::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: <unsupported-color>;
    -webkit-clip-path: inset(50%);
  }`
});
