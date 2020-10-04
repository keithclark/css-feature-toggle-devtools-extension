import { pseudoClassOption } from '../../feature-helpers.js';

export default pseudoClassOption({
  name: ':required / :optional',
  group: 'Selectors',
  pseudoClasses: [
    'required', 'optional'
  ]
});
