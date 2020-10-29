import {
  optionGroup,
  mediaFeatureOption,
  atRuleIdentifierOption
} from '../feature-helpers.js';


export default optionGroup('Media Queries', [

  mediaFeatureOption({
    id: 'media-queries-level-5#prefers-reduced-motion',
    name: 'Reduced motion',
    featureNames: ['prefers-reduced-motion']
  }),

  mediaFeatureOption({
    id: 'media-queries-level-5#prefers-color-scheme',
    name: 'Colour scheme',
    featureNames: ['prefers-color-scheme']
  }),

  mediaFeatureOption({
    id: 'media-queries-level-4#interatcion',
    name: 'Interaction',
    featureNames: ['pointer', 'hover', 'any-pointer', 'any-hover']
  }),

]);
