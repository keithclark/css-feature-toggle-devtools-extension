addTest({
  name: 'columns',
  group: 'Columns',
  css: `<indicator-selector> {
    columns: 2;
  }
  <indicator-selector>::before {
    content: '';
    height: 100%;
    display: block;
  }
  <indicator-selector>::after {
    content: '';
    width: 100%;
    height: 200%;
    display: block;
    background: <supported-color>;
    margin-left:-100%;
  }`
});

addTest({
  name: 'column-count',
  group: 'Columns',
  css: `<indicator-selector> {
    column-count: 2;
  }
  <indicator-selector>::before {
    content: '';
    height: 100%;
    display: block;
  }
  <indicator-selector>::after {
    content: '';
    width: 100%;
    height: 200%;
    display: block;
    background: <supported-color>;
    margin-left:-100%;
  }`
});

addTest({
  name: 'column-width',
  group: 'Columns',
  css: `<indicator-selector> {
    column-width: 500px;
  }
  <indicator-selector>::before {
    content: '';
    height: 100%;
    display: block;
  }
  <indicator-selector>::after {
    content: '';
    width: 100%;
    height: 200%;
    display: block;
    background: <supported-color>;
    margin-left:-100%;
  }`
});

addTest({
  name: '-webkit-columns',
  group: 'Columns',
  css: `<indicator-selector> {
    -webkit-columns: 2;
  }
  <indicator-selector>::before {
    content: '';
    height: 100%;
    display: block;
  }
  <indicator-selector>::after {
    content: '';
    width: 100%;
    height: 200%;
    display: block;
    background: <supported-color>;
    margin-left:-100%;
  }`
});

addTest({
  name: '-webkit-column-count',
  group: 'Columns',
  css: `<indicator-selector> {
    -webkit-column-count: 2;
  }
  <indicator-selector>::before {
    content: '';
    height: 100%;
    display: block;
  }
  <indicator-selector>::after {
    content: '';
    width: 100%;
    height: 200%;
    display: block;
    background: <supported-color>;
    margin-left:-100%;
  }`
});

addTest({
  name: '-webkit-column-width',
  group: 'Columns',
  css: `<indicator-selector> {
    -webkit-column-width: 500px;
  }
  <indicator-selector>::before {
    content: '';
    height: 100%;
    display: block;
  }
  <indicator-selector>::after {
    content: '';
    width: 100%;
    height: 200%;
    display: block;
    background: <supported-color>;
    margin-left:-100%;
  }`
});
