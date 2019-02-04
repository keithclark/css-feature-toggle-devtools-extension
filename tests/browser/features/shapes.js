addTest({
  name: 'shape-outside',
  group: 'Shapes',
  css: `<indicator-selector>::before {
    content: '';
    display: block;
    width: 1%;
    height: 200%;
    shape-outside: inset(50%);
    float: left;
  }
  <indicator-selector>::after {
    content: '';
    display: inline-block;
    width: 100%;
    height: 100%;
    background: <supported-color>;
  }`
});


addTest({
  name: '-webkit-shape-outside',
  group: 'Shapes',
  css: `<indicator-selector>::before {
    content: '';
    display: block;
    width: 1%;
    height: 200%;
    -webkit-shape-outside: inset(50%);
    float: left;
  }
  <indicator-selector>::after {
    content: '';
    display: inline-block;
    width: 100%;
    height: 100%;
    background: <supported-color>;
  }`
});
