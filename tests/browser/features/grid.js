addTest({
  name: 'grid',
  group: 'Grids',
  css: `<indicator-selector> {
    display: grid;
  }
  <indicator-selector>::before {
    content: '';
    background: <supported-color>;
  }`
});

addTest({
  name: 'inline-grid',
  group: 'Grids',
  css: `<indicator-selector> {
    display: inline-grid;
  }
  <indicator-selector>::before {
    content: '';
    background: <supported-color>;
  }`
});
