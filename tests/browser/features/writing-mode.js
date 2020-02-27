addTest({
  name: 'writing-mode',
  group: 'Writing Mode',
  css: `<indicator-selector> {
    background: <supported-color>;
    writing-mode: vertical-lr;;
  }
  <indicator-selector>::before {
    content: '█';
    display: inline-block;
    font-size: 64px;
    line-height: 24px;
    height: 96px;
    text-align: right;
    color: <unsupported-color>;
  }`
});

addTest({
  name: '-webkit-writing-mode',
  group: 'Writing Mode',
  css: `<indicator-selector> {
    background: <supported-color>;
    -webkit-writing-mode: vertical-lr;;
  }
  <indicator-selector>::before {
    content: '█';
    display: inline-block;
    font-size: 64px;
    line-height: 24px;
    height: 96px;
    text-align: right;
    color: <unsupported-color>;
  }`
});