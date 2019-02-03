addTest({
  name: 'var',
  group: 'Custom properties',
  css: `<indicator-selector> {
    --var-test-color: <supported-color>;
    background: var(--var-test-color);
  }`
});
