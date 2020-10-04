/**
 * This tests the `:default` pseudo-class.
 */

addTest({
  name: ':default',
  group: 'Selectors',
  html: `<form><button></button></form>`,
  css: `<indicator-selector> button {
    display: block;
    background: inherit;
    font-size:0;
    padding:100%;
    border:none;
  }
  <indicator-selector> :default {
    background: <supported-color>;
  }`
});

