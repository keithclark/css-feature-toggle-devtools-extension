import {propertyValueOption} from '../feature-helpers.js';

export default propertyValueOption({
  name: 'Flexbox layout',
  group: 'Box Layout',
  help: 'Disable support for the flexible box layout model',
  propertyName: 'display',
  propertyValues: [
    '-webkit-box',
    '-webkit-flex',
    '-moz-box',
    'flex',
    '-webkit-inline-box',
    '-webkit-inline-flex',
    '-moz-inline-box',
    'inline-flex'
  ]
});
