import {propertyNameOption} from '../feature-helpers.js';

export default propertyNameOption({
  name: 'Masking',
  group: 'Visual Rendering',
  help: 'Disable masking via `mask` and `mask-image`',
  propertyNames: [
    '-webkit-mask',
    'mask',
    '-webkit-mask-image',
    'mask-image'
  ]
});
