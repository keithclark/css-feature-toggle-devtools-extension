addTest({
    name: 'aspect-ratio',
    group: 'Aspect ratio',
    css: `<indicator-selector>::before {
    content: '';
    display: block;
    background: <supported-color>;
    width: 100%;
    aspect-ratio: 1 / 1;
  }`
});