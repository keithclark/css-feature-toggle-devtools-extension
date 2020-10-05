import {
  optionGroup,
  propertyNameOption
} from '../feature-helpers.js';

export default optionGroup('Content Layout', [

  propertyNameOption({
    id: 'shapes-level-1-shape',
    name: 'Shapes',
    group: 'Content Layout',
    propertyNames: [
      'shape-inside', 'shape-outside', '-webkit-shape-inside',
      '-webkit-shape-outside'
    ]
  }),

  propertyNameOption({
    id: 'images-level-3-object-fit',
    name: 'Object sizing',
    group: 'Content Layout',
    propertyNames: ['object-fit']
  }),

  propertyNameOption({
    id: 'writing-modes-level-3-writing-mode',
    name: 'Writing mode',
    group: 'Content Layout',
    propertyNames: [
      'writing-mode',
      '-webkit-writing-mode'
    ]
  })

]);
