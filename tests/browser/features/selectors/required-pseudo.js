/**
 * This tests the `:required` and `:optional` pseudo-classes. Inputs are
 * pre-populated with valid/invalid values and their contents are hidden.
 */

addTest({
  name: ':in-range',
  group: 'Selectors',
  html: `<input required>`,
  css: `<indicator-selector> input {
    background: inherit;
    font-size:0;
    height:100%;
    width:100%;
    border:none;
  }
  <indicator-selector> input:required {
    background: <supported-color>;
  }`
});

addTest({
  name: ':out-of-range',
  group: 'Selectors',
  html: `<input>`,
  css: `
  <indicator-selector> input {
    background: inherit;
    font-size:0;
    height:100%;
    width:100%;
    border:none;
  }
  <indicator-selector> input:optional {
    background: <supported-color>;
  }`
});