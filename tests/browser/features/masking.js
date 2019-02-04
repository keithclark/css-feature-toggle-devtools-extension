addTest({
  name: 'mask',
  group: 'Masking',
  css: `<indicator-selector> {
    background: <supported-color>;
  }
  <indicator-selector>::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: <unsupported-color>;
    mask: linear-gradient(transparent, transparent);;
  }`
});

addTest({
  name: 'mask-image',
  group: 'Masking',
  css: `<indicator-selector> {
    background: <supported-color>;
  }
  <indicator-selector>::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: <unsupported-color>;
    mask-image: linear-gradient(transparent, transparent);
  }`
});

addTest({
  name: '-webkit-mask',
  group: 'Masking',
  css: `<indicator-selector> {
    background: <supported-color>;
  }
  <indicator-selector>::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: <unsupported-color>;
    -webkit-mask: linear-gradient(transparent, transparent);
  }`
});

addTest({
  name: '-webkit-mask-iamge',
  group: 'Masking',
  css: `<indicator-selector> {
    background: <supported-color>;
  }
  <indicator-selector>::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: <unsupported-color>;
    -webkit-mask-image: linear-gradient(transparent, transparent);
  }`
});