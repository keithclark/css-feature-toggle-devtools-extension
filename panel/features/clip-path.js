import {propertyNameOption} from '../feature-helpers.js';

export default propertyNameOption({
  name: 'Clipping paths',
  group: 'Content Flow',
  help: 'Disable region clipping via `clip-path`',
  propertyNames: [
    'clip-path',
    '-webkit-clip-path'
  ]
});
