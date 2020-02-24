import {encodeRegExp} from './utils.js';


/**
 * Creates replacer function for enabling and disabling CSS features using the
 * passed regular expressions
 *
 * @param {RegExp} disableRegEx - The regular expression for disabling a feature
 * @param {RegExp} enableRegEx - The regular expression for re-enabling a feature
 */
const replacer = (disableRegEx, enableRegEx) => ({
  disable: cssText => cssText.replace(disableRegEx, '$1-disabled-$2'),
  enable: cssText => cssText.replace(enableRegEx, '$1$2')
});


/**
 * Create a property name replacer
 * 
 * @param {*} names - The property name to toggle
 */
const propertyName = names => {
  names = names.map(encodeRegExp).join('|');
  return replacer(
    new RegExp(`([;({/\\s])(${names})(?=\\s*:)`, 'g'),
    new RegExp(`([;({/\\s])-disabled-(${names})(?=\\s*:)`, 'g')
  );
};


/**
 * Create a property value replacer
 *
 * @param {*} name - The property name
 * @param {*} values - The values to toggle
 */
const propertyValue = (name, values) => {
  name = encodeRegExp(name);
  values = values.map(encodeRegExp).join('|');
  return replacer(
    new RegExp(`([;({/\\s]${name}\\s*:\\s*)(${values})(?=[)}/;\\s])`, 'g'),
    new RegExp(`([;({/\\s]${name}\\s*:\\s*)(?:-disabled-(${values}))(?=[)}/;\\s])`, 'g')
  );
};


/**
 * Create an at-rule identifier replacer
 *
 * @param {*} identifier - The identifier to toggle
 */
const atRuleIdentifier = identifier => {
  identifier = encodeRegExp(identifier);
  return replacer(
    new RegExp(`(@)(${identifier})`, 'g'),
    new RegExp(`(@)-disabled-(${identifier})`, 'g')
  );
};


/**
 * Create a CSS function replacer
 *
 * @param {*} names - The CSS function name to toggle
 */
const functionName = names => {
  names = names.map(encodeRegExp).join('|');
  return replacer(
    new RegExp(`([:(/\\s])(${names})(?=\\()`, 'g'),
    new RegExp(`([:(/\\s])-disabled-(${names})(?=\\()`, 'g')
  );
};


const mediaFeature = names => {
  names = names.map(encodeRegExp).join('|');
  return replacer(
    new RegExp(`(\\(\\s*)(${names})(?=\\s*:)`, 'g'),
    new RegExp(`(\\(\\s*)-disabled-(${names})(?=\\s*:)`, 'g'),
  );
};


/**
 * Returns a common option object
 *
 * @param {String} name - The name of the option
 * @param {String} group - The group the option belongs to
 * @param {Object} toggle - The enable/disable toggle replacers
 * @param {String} help - The help text for the option
 */
const option = (name, group, toggle, help) => ({
  name,
  group,
  help,
  ...toggle
});


/**
 * Helper for creating a feature toggle based one or more CSS property names.
 * i.e. `transform` or `clip-path`
 *
 * @param {Object} opts - Feature options
 * @param {String} opts.name - The name of the option
 * @param {String} opts.group - The group the option belongs to
 * @param {String} opts.help - The help text for the option
 * @param {[String]} opts.propertyNames - The property names that can be disabled
 */
const propertyNameOption = opts => {
  return option(
    opts.name,
    opts.group,
    propertyName(opts.propertyNames),
    opts.help
  );
};


/**
 * Helper for creating a feature toggle based on one or more property values.
 * i.e `display: flex`
 *
 * @param {Object} opts - Feature options
 * @param {String} opts.name - The name of the option
 * @param {String} opts.group - The group the option belongs to
 * @param {String} opts.help - The help text for the option
 * @param {String} opts.propertyName - The property these values apply to
 * @param {[String]} opts.propertyValues - The values that can be disabled
 * 
 */
const propertyValueOption = opts => {
  return option(
    opts.name,
    opts.group,
    propertyValue(opts.propertyName, opts.propertyValues),
    opts.help
  );
};


/**
 * Helper for creating a feature toggle for at rule indentifiers values - i.e
 * `@supports`
 *
 * @param {Object} opts - Feature options
 * @param {String} opts.name - The name of the option
 * @param {String} opts.group - The group the option belongs to
 * @param {String} opts.help - The help text for the option
 * @param {String} opts.identifier - The at-rule identifier can be disabled
 */
const atRuleIdentifierOption = opts => {
  return option(
    opts.name,
    opts.group,
    atRuleIdentifier(opts.identifier),
    opts.help
  );
};


/**
 * Helper for creating a feature toggle based one or more CSS function names.
 * i.e. `calc()` or `linear-gradient()`
 *
 * @param {Object} opts - Feature options
 * @param {String} opts.name - The name of the option
 * @param {String} opts.group - The group the option belongs to
 * @param {String} opts.help - The help text for the option
 * @param {[String]} opts.functionNames - The function names that can be disabled
 */
const functionNameOption = opts => {
  return option(
    opts.name,
    opts.group,
    functionName(opts.functionNames),
    opts.help
  );
};


/**
 * Helper for creating a feature toggle based one or more CSS media features.
 * i.e. `(prefers-reduced-motion: reduce)` or `(pointer: any)`
 *
 * @param {Object} opts - Feature options
 * @param {String} opts.name - The name of the option
 * @param {String} opts.group - The group the option belongs to
 * @param {String} opts.help - The help text for the option
 * @param {[String]} opts.functionNames - The features names that can be disabled
 */
const mediaFeatureOption = opts => {
  return option(opts.name,
    opts.group,
    mediaFeature(opts.featureNames),
    opts.help
  )
};


export {
  propertyNameOption,
  propertyValueOption,
  atRuleIdentifierOption,
  functionNameOption,
  mediaFeatureOption
};
