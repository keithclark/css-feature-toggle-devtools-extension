import {
  optionGroup,
  pseudoClassOption,
  functionalPseudoClassOption
} from '../feature-helpers.js';


export default optionGroup('Selectors', [

  pseudoClassOption({
    id: 'selectors-level-4-pseudo-class-default',
    name: ':default',
    pseudoClasses: ['default']
  }),

  pseudoClassOption({
    id: 'selectors-level-4-pseudo-class-focus-within',
    name: ':focus-within',
    pseudoClasses: ['focus-within']
  }),

  pseudoClassOption({
    id: 'selectors-level-4-pseudo-class-focus-visible',
    name: ':focus-visible',
    pseudoClasses: ['focus-visible']
  }),

  pseudoClassOption({
    id: 'selectors-level-4-pseudo-class-indeterminate',
    name: ':indeterminate',
    pseudoClasses: ['indeterminate']
  }),

  functionalPseudoClassOption({
    id: 'selectors-level-4-functional-pseudo-class-is',
    name: ':is()',
    pseudoClasses: ['is']
  }),

  pseudoClassOption({
    id: 'selectors-level-4-pseudo-class-range',
    name: ':in-range / out-of-range',
    pseudoClasses: ['in-range', 'out-of-range']
  }),

  pseudoClassOption({
    id: 'selectors-level-4-pseudo-class-validity',
    name: ':valid / :invalid',
    pseudoClasses: ['valid', 'invalid']
  }),

  pseudoClassOption({
    id: 'selectors-level-4-pseudo-class-required',
    name: ':required / :optional',
    pseudoClasses: ['required', 'optional']
  }),

  pseudoClassOption({
    id: 'selectors-level-4-pseudo-class-mutability',
    name: ':read-only / :read-write',
    pseudoClasses: ['read-only', 'read-write']
  })

]);
