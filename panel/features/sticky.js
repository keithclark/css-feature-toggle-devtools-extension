import {propertyValueOption} from '../feature-helpers.js';

export default propertyValueOption({
  name: 'Sticky positioning',
  group: 'Box Layout',
  help: 'Disable support for `position: sticky`',
  propertyName: 'position',
  propertyValues: [
    'sticky',
    '-webkit-sticky'
  ]
});
