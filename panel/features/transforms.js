import {propertyNameOption} from '../feature-helpers.js';

export default propertyNameOption({
  name: 'Transforms',
  group: 'Visual Rendering',
  help: 'Disable support for 2D and 3D transforms',
  propertyNames: [
    '-webkit-transform',
    '-moz-transform',
    'transform'
  ]
});
