/** @type {Record<string, number>} */
const roman_map = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1
}

/** @type {string[]} */
const allChars = Object.keys(roman_map)
/** @type {number[]} */
const allNumerals = Object.values(roman_map)
/** @type {RegExp} */
const romanPattern =
  /^(M{1,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|C?D|D?C{1,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|X?L|L?X{1,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|I?V|V?I{1,3}))$/

/**
 * @param {number} decimal
 * @returns {string}
 */
const romanize = (decimal) => {
  if (
    decimal <= 0 ||
    typeof decimal !== 'number' ||
    Math.floor(decimal) !== decimal
  ) {
    throw new Error('requires an unsigned integer')
  }
  if (decimal >= 4000) {
    throw new Error('requires max value of less than 3999 or less')
  }
  /** @type {string} */
  let roman = ''
  for (let /** @type {number} */ i = 0; i < allChars.length; i++) {
    while (decimal >= /** @type {number} */ (allNumerals[i])) {
      decimal -= /** @type {number} */ (allNumerals[i])
      roman += allChars[i]
    }
  }
  return roman
}

/**
 * @param {string} romanStr
 * @returns {number}
 */
const deromanize = (romanStr) => {
  if (typeof romanStr !== 'string') {
    throw new Error('requires a string')
  }
  if (!romanPattern.test(romanStr)) {
    throw new Error('requires valid roman numeral string')
  }
  /** @type {string} */
  let romanString = romanStr.toUpperCase()
  /** @type {number} */
  let arabic = 0
  /** @type {number} */
  let iteration = romanString.length
  while (iteration--) {
    /** @type {number} */
    let cumulative = /** @type {number} */ (roman_map[/** @type {string} */ (romanString[iteration])])
    if (cumulative < /** @type {number} */ (roman_map[/** @type {string} */ (romanString[iteration + 1])])) {
      arabic -= cumulative
    } else {
      arabic += cumulative
    }
  }
  return arabic
}

export {
  deromanize,
  romanize,
  allChars,
  allNumerals
}
