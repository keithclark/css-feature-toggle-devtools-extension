import {propertyNameOption} from '../feature-helpers.js';

export default propertyNameOption({
  name: 'Box model sizing',
  group: 'Box Layout',
  help: 'Disable support for the `box-sizing` property',
  propertyNames: [
    '-webkit-box-sizing',
    '-moz-box-sizing',
    'box-sizing'
  ]
});
