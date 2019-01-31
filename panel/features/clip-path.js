import {propertyNameOption} from '../feature-helpers.js';

export default propertyNameOption({
  name: 'Clipping paths',
  group: 'Visual Rendering',
  help: 'Disable region clipping via `clip-path`',
  propertyNames: [
    '-webkit-clip-path',
    'clip-path'
  ]
});
