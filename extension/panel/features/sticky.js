import {propertyValueOption} from '../feature-helpers.js';

export default propertyValueOption({
  name: 'Sticky positioning',
  group: 'Box Layout',
  propertyName: 'position',
  propertyValues: [
    'sticky',
    '-webkit-sticky'
  ]
});
