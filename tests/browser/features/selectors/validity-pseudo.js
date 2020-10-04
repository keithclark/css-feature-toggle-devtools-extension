/**
 * This tests the `:valid` and `:invalid` pseudo-classes. Inputs are
 * pre-populated with valid/invalid values and their contents are hidden.
 */

addTest({
  name: ':valid',
  group: 'Selectors',
  html: `<input value="2" pattern="2">`,
  css: `<indicator-selector> input {
    background: inherit;
    font-size:0;
    height:100%;
    width:100%;
    border:none;
  }
  <indicator-selector> input:valid {
    background: <supported-color>;
  }`
});

addTest({
  name: ':invalid',
  group: 'Selectors',
  html: `<input required>`,
  css: `<indicator-selector> input {
    background: inherit;
    font-size:0;
    height:100%;
    width:100%;
    border:none;
  }
  <indicator-selector> input:invalid {
    background: <supported-color>;
  }`
});

