addTest({
  name: 'sticky',
  group: 'Position',
  css: `<indicator-selector> {
    background: <supported-color>;
  }
  <indicator-selector>::before {
    position: sticky;
    top: 0;
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: <unsupported-color>;
  }`
});

addTest({
  name: '-webkit-sticky',
  group: 'Position',
  css: `<indicator-selector> {
    background: <supported-color>;
  }
  <indicator-selector>::before {
    position: -webkit-sticky;
    top: 0;
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: <unsupported-color>;
  }`
});
