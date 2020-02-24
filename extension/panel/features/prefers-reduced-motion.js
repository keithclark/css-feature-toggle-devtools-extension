import {mediaFeatureOption} from '../feature-helpers.js';

export default mediaFeatureOption({
  name: 'Reduced motion',
  group: 'Other',
  help: 'Disable support for the `prefers-reduced-motion` media feature',
  featureNames: [
    'prefers-reduced-motion'
  ]
});
