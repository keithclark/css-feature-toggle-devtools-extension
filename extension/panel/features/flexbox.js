import {propertyValueOption} from '../feature-helpers.js';

export default propertyValueOption({
  name: 'Flexbox layout',
  group: 'Box Layout',
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
