import {propertyNameOption} from '../feature-helpers.js';

export default propertyNameOption({
  name: 'Multi-column layout',
  group: 'Box Layout',
  help: 'Disable support for columns',
  propertyNames: [
    '-webkit-columns',
    '-moz-columns',
    'columns',
    '-webkit-column-count',
    '-moz-column-count',
    'column-count',
    '-webkit-column-width',
    '-moz-column-width',
    'column-width'
  ]
});
