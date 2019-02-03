addTest({
  name: 'object-fit',
  group: 'Object Sizing',
  html: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8a8zwHwAFFgIRW0UNBgAAAABJRU5ErkJggg==">',
  css: `<indicator-selector> {
    background: <supported-color>;
  }
  <indicator-selector> img {
    width: 200%;
    height: 200%;
    display: block;
    object-fit: none;
  }`
});
