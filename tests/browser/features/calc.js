/**
 * This tests the `calc()` function. The test creates a green pseudo-element
 * that covers the red indicator. calc is used to compute 50% padding + 0px. If
 * the browser supports calc, the pseudo-element will fill the indicator element
 * resulting in a green colour. If the browser doesn't support calc, the padding
 * will be ignored and the red colour will show.
 */

addTest({
  name: 'calc',
  group: 'Mathematical expressions',
  css: `<indicator-selector>::before {
    content: '';
    display: block;
    padding: calc(50% + 0px);
    background: <supported-color>;
  }`
});
