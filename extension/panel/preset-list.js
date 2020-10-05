import ie10 from './presets/browsers/ie10.js'
import ie11 from './presets/browsers/ie11.js'

import css2_1 from './presets/css-levels/css2.1.js'
import css3 from './presets/css-levels/css3.js'


export default [
  {
    label: 'IE10',
    group: 'Browsers',
    features: ie10
  },
  ie11,
  {
    label: 'CSS 2.1',
    group: 'CSS Levels',
    features: css2_1
  },
  {
    label: 'CSS 3',
    group: 'CSS Levels',
    features: css3
  }
];
