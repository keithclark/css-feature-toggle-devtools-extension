import {propertyNameOption} from '../feature-helpers.js';

export default propertyNameOption({
  name: 'Transitions',
  group: 'Visual Rendering',
  help: 'Disable support for transitions',
  propertyNames: [
    '-webkit-transition',
    'transition'
  ]
});
