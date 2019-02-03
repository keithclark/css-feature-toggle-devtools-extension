addTest({
  name: 'background-blend-mode',
  group: 'Compositing',
  css: `<indicator-selector> {
    background: linear-gradient(<unsupported-color>,<unsupported-color>) #5cff92;
    background-blend-mode: exclusion;
  }`
});

addTest({
  name: 'mix-blend-mode',
  group: 'Compositing',
  css: `<indicator-selector> {
    background: #5cff92;
  }
  <indicator-selector>::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: <unsupported-color>;
    mix-blend-mode: exclusion;
  }`
});
