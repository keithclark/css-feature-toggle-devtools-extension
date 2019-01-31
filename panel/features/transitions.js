import {propertyNameOption} from '../feature-helpers.js';

export default propertyNameOption({
  name: 'Transitions',
  group: 'Visual Rendering',
  help: 'Disable support for transitions',
  propertyNames: [
    '-webkit-transition',
    '-moz-transition',
    'transition',
    '-webkit-transition-property',
    '-moz-transition-property',
    'transition-property'
  ]
});
