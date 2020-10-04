import { pseudoClassOption } from '../../feature-helpers.js';

export default pseudoClassOption({
  name: ':valid / :invalid',
  group: 'Selectors',
  pseudoClasses: [
    'valid', 'invalid'
  ]
});
