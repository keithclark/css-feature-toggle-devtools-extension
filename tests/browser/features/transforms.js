addTest({
  name: 'transforms',
  group: 'Transforms',
  css: `<indicator-selector>::before {
    content: '';
    display: block;
    background: <supported-color>;
    margin-left: 100%;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
  }`
});

addTest({
  name: '-webkit-transforms',
  group: 'Transforms',
  css: `<indicator-selector>::before {
    content: '';
    display: block;
    background: <supported-color>;
    margin-left: 100%;
    width: 100%;
    height: 100%;
    -webkit-transform: translateX(-100%);
  }`
});
