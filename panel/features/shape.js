import {propertyNameOption} from '../feature-helpers.js';

export default propertyNameOption({
  name: 'Shapes',
  group: 'Content Flow',
  help: 'Disable support for `shape-inside` and `shape-outside`',
  propertyNames: [
    'shape-inside',
    'shape-outside',
    '-webkit-shape-inside',
    '-webkit-shape-outside'
  ]
});
