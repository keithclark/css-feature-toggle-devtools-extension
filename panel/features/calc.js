import {functionNameOption} from '../feature-helpers.js';

export default functionNameOption({
  name: 'Mathematical expressions',
  group: 'Other',
  help: 'Disable support for the `calc()` function',
  functionNames: [
    '-webkit-calc',
    '-moz-calc',
    'calc'
  ]
});
