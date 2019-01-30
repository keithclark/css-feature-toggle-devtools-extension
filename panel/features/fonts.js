import {atRuleIdentifierOption} from '../feature-helpers.js';

export default atRuleIdentifierOption({
  name: 'Custom fonts',
  group: 'Other',
  help: 'Disable support for custom fonts defined with `@font-face`',
  identifier: 'font-face'
});
