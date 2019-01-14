import {functionNameOption} from '../feature-helpers.js';

export default functionNameOption({
  name: 'Custom properties',
  group: 'Other',
  help: 'Disable support for the `var()` function',
  functionNames: [
    'var'
  ]
});
