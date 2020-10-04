/**
 * This tests the `:scope` pseudo-classes. It uses the implied :root to style
 * the test  element
 */

addTest({
  name: ':indeterminate',
  group: 'Selectors',
  html: `<input name="x" type="radio">`,
  css: `<indicator-selector> input {
    display:block;
    background:transparent;
    font-size:0;
    height:100%;
    width:100%;
    border:none;
    appearance: none;
    margin:0;
    -webkit-appearance:none;
  }
  <indicator-selector> input:indeterminate {
    background: <supported-color>;
  }`
});
