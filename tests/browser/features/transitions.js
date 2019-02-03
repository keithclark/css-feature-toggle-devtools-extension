addTest({
  name: 'transition',
  group: 'Transitions',
  css: `@supports (transition: all) {
    <indicator-selector> {
      background: <supported-color>;
      transition: background 0s;
    }
  }`
});

addTest({
  name: 'transition-duration',
  group: 'Transitions',
  css: `@supports (transition-duration: 1s) {
    <indicator-selector> {
      background: <supported-color>;
      transition-duration: 0.001s;
    }
  }`
});

addTest({
  name: 'transition-delay',
  group: 'Transitions',
  css: `@supports (transition-delay: 1s) {
    <indicator-selector> {
      background: <supported-color>;
      transition-delay: 0.001s;
    }
  }`
});
