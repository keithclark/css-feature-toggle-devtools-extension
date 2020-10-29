import {
  optionGroup,
  atRuleIdentifierOption,
  propertyNameOption,
  functionNameOption,
} from '../feature-helpers.js';

export default optionGroup('Other', [

  atRuleIdentifierOption({
    id: 'conditional-rules-level-4#supports',
    name: 'Feature detection',
    identifier: 'supports'
  }),

  functionNameOption({
    id: 'custom-properties-level-1#variables',
    name: 'Custom properties',
    functionNames: ['var']
  }),

  functionNameOption({
    id: 'values-and-units-level-3#calc',
    name: 'Mathematical expressions',
    functionNames: ['calc', '-webkit-calc']
  }),

  atRuleIdentifierOption({
    id: 'fonts#font-face',
    name: 'Custom fonts',
    identifier: 'font-face'
  }),

  propertyNameOption({
    id: 'cssom#scroll-behavior',
    name: 'Scroll behavior',
    propertyNames: ['scroll-behavior']
  }),

  propertyNameOption({
    id: 'scroll-snapp-level-1#scroll-snap',
    name: 'Scroll snapping',
    propertyNames: ['scroll-snap-type', '-webkit-scroll-snap-type']
  })

]);
