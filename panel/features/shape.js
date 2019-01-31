import {propertyNameOption} from '../feature-helpers.js';

export default propertyNameOption({
  name: 'Shapes',
  group: 'Content Layout',
  help: 'Disable support for `shape-outside`',
  propertyNames: [
    '-webkit-shape-outside',
    'shape-outside'
  ]
});
