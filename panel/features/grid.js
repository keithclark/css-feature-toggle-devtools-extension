import {propertyValueOption} from '../feature-helpers.js';

export default propertyValueOption({
  name: 'Grid layout',
  group: 'Layout',
  help: 'Disable support for the grid layout model',
  propertyName: 'display',
  propertyValues: [
    'grid',
    'inline-grid'
  ]
});
