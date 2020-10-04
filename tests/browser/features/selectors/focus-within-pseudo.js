/**
 * This tests the `focus-within` pseudo-class. It requires the test element to
 * have focus for the test to work.
 */

addTest({
  name: ':focus-within',
  group: 'Selectors',
  html: '<input autofocus>',
  css: `<indicator-selector> input {
    width:100%;
    height:100%;
    background:transparent;
    border:none
  }
  <indicator-selector>:focus-within {
    background: <supported-color>;
  }`
});
