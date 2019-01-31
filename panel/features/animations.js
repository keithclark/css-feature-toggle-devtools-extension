import {propertyNameOption} from '../feature-helpers.js';

export default propertyNameOption({
  name: 'Animations',
  group: 'Visual Rendering',
  help: 'Disable support for animations',
  propertyNames: [
    '-webkit-animation',
    '-moz-animation',
    'animation',
    '-webkit-animation-name',
    '-moz-animation-name',
    'animation-name'
  ]
});
