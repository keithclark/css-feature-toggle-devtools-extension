import {propertyNameOption} from '../feature-helpers.js';

export default propertyNameOption({
  name: 'Multi-column layout',
  group: 'Box Layout',
  propertyNames: [
    'columns',
    'column-count',
    'column-width',
    '-webkit-columns',
    '-webkit-column-count',
    '-webkit-column-width'
  ]
});
