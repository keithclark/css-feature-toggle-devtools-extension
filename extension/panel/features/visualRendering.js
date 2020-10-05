import {
  optionGroup,
  propertyNameOption,
  functionNameOption
} from '../feature-helpers.js';

export default optionGroup('Visual Rendering', [

  propertyNameOption({
    id: 'transforms-level-1-transform',
    name: 'Transforms',
    propertyNames: ['transform', '-webkit-transform']
  }),

  propertyNameOption({
    id: 'compositing-level-1-blend-mode',
    name: 'Compositing and blending',
    propertyNames: ['background-blend-mode', 'mix-blend-mode']
  }),

  propertyNameOption({
    id: 'filter-effects-level-1-filters',
    name: 'Filters',
    propertyNames: ['filter', '-webkit-filter']
  }),

  propertyNameOption({
    id: 'masking-level-1-clip-path',
    name: 'Clipping paths',
    propertyNames: ['clip-path', '-webkit-clip-path']
  }),

  propertyNameOption({
    id: 'masking-level-1-mask',
    name: 'Masking',
    propertyNames: [
      'mask', 'mask-image', '-webkit-mask', '-webkit-mask-image'
    ]
  }),

  propertyNameOption({
    id: 'transitions-level-1-transition',
    name: 'Transitions',
    propertyNames: [
      '-webkit-transition', 'transition', '-webkit-transition-duration',
      'transition-duration', '-webkit-transition-delay', 'transition-delay'
    ]
  }),

  propertyNameOption({
    id: 'animations-level-1-animation',
    name: 'Animations',
    propertyNames: [
      '-webkit-animation', 'animation', '-webkit-animation-name',
      'animation-name'
    ]
  }),

  functionNameOption({
    id: 'images-level-3-conic-gradient',
    name: 'Conical gradients',
    functionNames: ['conic-gradient']
  })

]);
