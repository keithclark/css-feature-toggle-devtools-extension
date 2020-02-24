import {propertyValueOption} from '../feature-helpers.js';

export default propertyValueOption({
  name: 'Grid layout',
  group: 'Box Layout',
  propertyName: 'display',
  propertyValues: [
    'grid',
    'inline-grid'
  ]
});
