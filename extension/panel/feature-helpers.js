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


/**
 * Create a CSS media feature replacer for rules such as:
 *
 * @media (pointer: any) {...}
 * @media (prefers-reduced-motion: reduce) {...}
 *
 * @param {*} names - The CSS feature to toggle
 */
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
 * Helper for creating a help text snippet that lists the values of a feature
 * that will be disabled. Removes vendor prefixes to keep contents short.
 *
 * @param {*} props
 * @param {*} singular
 * @param {*} plural
 */
const createHelpText = (props, singular, plural = singular + 's') => {
  let standardsProps = props.filter(prop => !prop.startsWith('-'));
  let text = ['Disable'];
  if (standardsProps.length > 1) {
    text.push(`${plural} '${standardsProps.slice(0, -1).join("', '")}' and '${standardsProps.slice(-1)}'`);
  } else {
    text.push(`the '${standardsProps[0]}' ${singular}`);
  }
  return text.join(' ');
}


/**
 * Helper for creating a feature toggle based one or more CSS property names.
 * i.e. `transform` or `clip-path`
 *
 * @param {Object} opts - Feature options
 * @param {String} opts.name - The name of the option
 * @param {String} opts.group - The group the option belongs to
 * @param {[String]} opts.propertyNames - The property names that can be disabled
 */
const propertyNameOption = ({name, group, propertyNames}) => {
  return option(
    name,
    group,
    propertyName(propertyNames),
    createHelpText(propertyNames, 'property', 'properties'),
  );
};


/**
 * Helper for creating a feature toggle based on one or more property values.
 * i.e `display: flex`
 *
 * @param {Object} opts - Feature options
 * @param {String} opts.name - The name of the option
 * @param {String} opts.group - The group the option belongs to
 * @param {String} opts.propertyName - The property these values apply to
 * @param {[String]} opts.propertyValues - The values that can be disabled
 */
const propertyValueOption = ({name, group, propertyName, propertyValues}) => {
  return option(
    name,
    group,
    propertyValue(propertyName, propertyValues),
    createHelpText(propertyValues, 'value') + ` of the '${propertyName}' property`,
  );
};


/**
 * Helper for creating a feature toggle for at rule indentifiers values - i.e
 * `@supports`
 *
 * @param {Object} opts - Feature options
 * @param {String} opts.name - The name of the option
 * @param {String} opts.group - The group the option belongs to
 * @param {String} opts.identifier - The at-rule identifier can be disabled
 */
const atRuleIdentifierOption = ({name, group, identifier})  => {
  return option(
    name,
    group,
    atRuleIdentifier(identifier),
    createHelpText([identifier], 'at-rule'),
  );
};


/**
 * Helper for creating a feature toggle based one or more CSS function names.
 * i.e. `calc()` or `linear-gradient()`
 *
 * @param {Object} opts - Feature options
 * @param {String} opts.name - The name of the option
 * @param {String} opts.group - The group the option belongs to
 * @param {[String]} opts.functionNames - The function names that can be disabled
 */
const functionNameOption = ({name, group, functionNames}) => {
  return option(
    name,
    group,
    functionName(functionNames),
    createHelpText(functionNames, 'function'),
  );
};


/**
 * Helper for creating a feature toggle based one or more CSS media features.
 * i.e. `(prefers-reduced-motion: reduce)` or `(pointer: any)`
 *
 * @param {Object} opts - Feature options
 * @param {String} opts.name - The name of the option
 * @param {String} opts.group - The group the option belongs to
 * @param {[String]} opts.featureNames - The features names that can be disabled
 */
const mediaFeatureOption = ({name, group, featureNames}) => {
  return option(
    name,
    group,
    mediaFeature(featureNames),
    createHelpText(featureNames, 'media feature'),
  )
};


export {
  propertyNameOption,
  propertyValueOption,
  atRuleIdentifierOption,
  functionNameOption,
  mediaFeatureOption
};
