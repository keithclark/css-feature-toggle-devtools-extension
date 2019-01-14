/**
 * Encodes a string so it is safe to use in a RegExp pattern
 * 
 * @param {string} string - The string to encode
 * @returns {string} The encoded string value
 */
export const encodeRegExp = string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
