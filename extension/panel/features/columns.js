import {propertyNameOption} from '../feature-helpers.js';

export default propertyNameOption({
  name: 'Multi-column layout',
  group: 'Box Layout',
  help: 'Disable support for columns',
  propertyNames: [
    'columns',
    'column-count',
    'column-width'
  ]
});
