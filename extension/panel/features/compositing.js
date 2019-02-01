import {propertyNameOption} from '../feature-helpers.js';

export default propertyNameOption({
  name: 'Compositing and blending',
  group: 'Visual Rendering',
  help: 'Disable background and content blending modes',
  propertyNames: [
    'background-blend-mode',
    'mix-blend-mode'
  ]
});
