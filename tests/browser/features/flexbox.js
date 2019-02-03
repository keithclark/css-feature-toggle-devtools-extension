addTest({
  name: 'flex',
  group: 'Flexbox',
  css: `<indicator-selector> {
      display: flex;
    }
    <indicator-selector>::before {
      content: '';
      flex: 1;
      background: <supported-color>
    }`
});

addTest({
  name: 'inline-flex',
  group: 'Flexbox',
  css: `<indicator-selector> {
      display: inline-flex;
    }
    <indicator-selector>::before {
      content: '';
      flex: 1;
      background: <supported-color>
    }`
});

addTest({
  name: '-webkit-flex',
  group: 'Flexbox',
  css: `<indicator-selector> {
      display: -webkit-flex;
    }
    <indicator-selector>::before {
      content: '';
      flex: 1;
      background: <supported-color>
    }`
});

addTest({
  name: '-webkit-inline-flex',
  group: 'Flexbox',
  css: `<indicator-selector> {
      display: -webkit-inline-flex;
    }
    <indicator-selector>::before {
      content: '';
      flex: 1;
      background: <supported-color>
    }`
});
