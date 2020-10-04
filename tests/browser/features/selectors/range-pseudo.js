/**
 * This tests the `:in-range` and `:out-of-range` pseudo-classes. Inputs are
 * pre-populated with valid/invalid values and their contents are hidden.
 */

addTest({
  name: ':in-range',
  group: 'Selectors',
  html: `<input type="number" value="1" min="0" max="2">`,
  css: `<indicator-selector> input {
    background: inherit;
    font-size:0;
    height:100%;
    width:100%;
    border:none;
  }
  <indicator-selector> input:in-range {
    background: <supported-color>;
  }`
});

addTest({
  name: ':out-of-range',
  group: 'Selectors',
  html: `<input type="number" value="-1" min="0" max="2">`,
  css: `
  <indicator-selector> input {
    background: inherit;
    font-size:0;
    height:100%;
    width:100%;
    border:none;
  }
  <indicator-selector> input:out-of-range {
    background: <supported-color>;
  }`
});