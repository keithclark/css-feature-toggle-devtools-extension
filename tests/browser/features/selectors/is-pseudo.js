/**
 * This tests the `:is()` functional pseudo-class. It requires the
 * element to have focus for the test to work.
 */

addTest({
  name: ':is',
  group: 'Selectors',
  html: `<span></span>`,
  css: `<indicator-selector> span {
    display:block;
    width:100%;
    height:100%;
  }
  :is(<indicator-selector>) span {
    background: <supported-color>;
  }`
});
