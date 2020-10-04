import { pseudoClassOption } from '../../feature-helpers.js';

export default pseudoClassOption({
  name: ':read-only / :read-write',
  group: 'Selectors',
  pseudoClasses: [
    'read-only', 'read-write'
  ]
});
