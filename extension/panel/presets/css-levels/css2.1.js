// This is a list of features that must be disabled to emulate CSS support up to
// CSS Level 2

import css3 from './css3.js';

export default [
  'css-grid-level-2',
  'css-flex-level-1',
  'sizing-level-3-box-sizing',
  'positioned-layout-level-3-sticky',
  'css-multi-columns-level-1',
  ...css3
];
