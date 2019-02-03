addTest({
  name: 'supports',
  group: 'Feature detection',
  css: `@supports (color: red) {
    <indicator-selector> {
      background: <supported-color>;
    }
  }`
});
