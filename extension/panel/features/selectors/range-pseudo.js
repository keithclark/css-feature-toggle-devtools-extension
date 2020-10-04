import { pseudoClassOption } from '../../feature-helpers.js';

export default pseudoClassOption({
  name: ':in-range / out-of-range',
  group: 'Selectors',
  pseudoClasses: [
    'in-range', 'out-of-range'
  ]
});
