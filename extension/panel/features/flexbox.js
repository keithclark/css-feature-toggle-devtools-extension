import {propertyValueOption} from '../feature-helpers.js';

export default propertyValueOption({
  name: 'Flexbox layout',
  group: 'Box Layout',
  help: 'Disable support for the flexible box layout model',
  propertyName: 'display',
  propertyValues: [
    'flex',
    'inline-flex',
    '-webkit-flex',
    '-webkit-inline-flex',
    '-webkit-box',
    '-webkit-inline-box'
  ]
});
