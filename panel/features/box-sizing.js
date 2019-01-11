import {propertyNameOption} from '../feature-helpers.js';

export default propertyNameOption({
  name: 'Box model sizing',
  group: 'Layout',
  help: 'Disable support for the `box-sizing` property',
  propertyNames: [
    'box-sizing',
    '-webkit-box-sizing'
  ]
});
