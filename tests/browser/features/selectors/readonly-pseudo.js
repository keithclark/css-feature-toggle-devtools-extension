/**
 * This tests the `:read-only` and `:read-write` pseudo-classes. Inputs are
 * pre-populated with valid/invalid values and their contents are hidden.
 */

addTest({
  name: ':read-only',
  group: 'Selectors',
  html: `<input readonly>`,
  css: `<indicator-selector> input {
    background: inherit;
    font-size:0;
    height:100%;
    width:100%;
    border:none;
  }
  <indicator-selector> input:read-only {
    background: <supported-color>;
  }`
});

addTest({
  name: ':read-write',
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
  <indicator-selector> input:read-write {
    background: <supported-color>;
  }`
});