import {propertyNameOption} from '../feature-helpers.js';

export default propertyNameOption({
  name: 'Transitions',
  group: 'Visual Rendering',
  propertyNames: [
    '-webkit-transition',
    'transition',
    '-webkit-transition-duration',
    'transition-duration',
    '-webkit-transition-delay',
    'transition-delay'
  ]
});
