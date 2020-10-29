import {
  optionGroup,
  propertyNameOption,
  propertyValueOption
} from '../feature-helpers.js';

export default optionGroup('Box Layout', [

  propertyValueOption({
    id: 'css-grid-level-1',
    name: 'Grid layout',
    propertyNames: ['display'],
    propertyValues: ['grid', 'inline-grid']
  }),

  propertyValueOption({
    id: 'css-grid-level-2-subgrid',
    name: 'Subgrid layout',
    propertyNames: ['grid-template-columns', 'grid-template-rows'],
    propertyValues: ['subgrid']
  }),

  propertyValueOption({
    id: 'css-flex-level-1',
    name: 'Flexbox layout',
    propertyNames: ['display'],
    propertyValues: [
      'flex', 'inline-flex', '-webkit-flex', '-webkit-inline-flex',
      '-webkit-box', '-webkit-inline-box'
    ]
  }),

  propertyNameOption({
    id: 'sizing-level-3-box-sizing',
    name: 'Box model sizing',
    propertyNames: ['box-sizing', '-webkit-box-sizing']
  }),

  propertyValueOption({
    id: 'positioned-layout-level-3-sticky',
    name: 'Sticky positioning',
    propertyNames: ['position'],
    propertyValues: ['sticky', '-webkit-sticky']
  }),

  propertyNameOption({
    id: 'css-multi-columns-level-1',
    name: 'Multi-column layout',
    propertyNames: [
      'columns', 'column-count', 'column-width', '-webkit-columns',
      '-webkit-column-count', '-webkit-column-width'
    ]
  })

]);
