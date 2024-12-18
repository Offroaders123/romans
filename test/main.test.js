/* eslint-disable */
const romans = require('../src/romans')
const { deromanize } = require('../src/romans')

describe(`needs some methods`, () => {
  it('should be an object', () => {
    expect(typeof romans).toBe('object')
  })

  it(`should have a method called 'deromanize'`, function () {
    expect(typeof romans.deromanize).toBe('function')
  })

  it(`should have a method called 'romanize'`, function () {
    expect(typeof romans.romanize).toBe('function')
  })
})

describe('check for parity on input & output', function () {
  it('should return the same value on conversion', function () {
    const myRoman = 'CCLIV'
    const myArabic = romans.deromanize(myRoman)
    expect(myArabic).toEqual(romans.deromanize(myRoman))
  })

  it('should throw on mixed cases', function () {
    const myStrings = ['mXvIi', 'dcvii', 'mmILV']
    myStrings.forEach((k) => {
      expect(function () {
        deromanize(k)
      }).toThrow()
    })
  })
  it(`should return a solid value for 153`, function () {
    expect(romans.romanize(153)).toBe('CLIII')
    expect(romans.deromanize(`CLIII`)).toBe(153)
  })
  it(`should reject invalid input`, function () {
    // https://github.com/qbunt/romans/issues/16
    expect(function () {
      romans.deromanize(`CIVIL`)
    }).toThrow(`requires valid roman numeral string`)
  })
})

describe('ensure formatting of data structures is sound', function () {
  it('should contain only characters', function () {
    const myValues = romans.allChars
    expect(validateForType(myValues, 'string')).toBeTruthy()
  })

  it('should contain only numbers', function () {
    const myValues = romans.allNumerals
    expect(validateForType(myValues, 'number')).toBeTruthy()
  })
})

describe('should return errors on bad input', function () {
  it('should reject 0', function () {
    expect(function () {
      romans.romanize(0)
    }).toThrow()
  })

  it(`should reject 4000`, function () {
    expect(function () {
      romans.romanize(4000)
    }).toThrow()
  })
  it('should reject signed integers', function () {
    expect(function () {
      romans.romanize(getRandomInt(-1, -1000))
    }).toThrow()
  })
  it('should reject undefined values', function () {
    expect(function () {
      romans.romanize(
        // @ts-expect-error
        undefined
      )
    }).toThrow()
  })
  it('should reject null values', function () {
    expect(function () {
      romans.romanize(
        // @ts-expect-error
        null
      )
    }).toThrow()
  })
  it('should reject blank values', function () {
    expect(function () {
      romans.romanize(
        // @ts-expect-error
        ''
      )
    }).toThrow()
  })
  it('should reject blank values', function () {
    expect(function () {
      romans.romanize(
        // @ts-expect-error
        '1000'
      )
    }).toThrow()
  })
  it('should throw on non-string input', function () {
    expect(function () {
      romans.deromanize(
        // @ts-expect-error
        1000
      )
    }).toThrow()

    expect(function () {
      romans.deromanize(
        // @ts-expect-error
        { value: 'III' }
      )
    }).toThrow()

    expect(function () {
      romans.deromanize(
        // @ts-expect-error
        true
      )
    }).toThrow()

    expect(function () {
      romans.deromanize(
        // @ts-expect-error
        {
          toUpperCase: function () {
            return 'III'
          }
        }
      )
    }).toThrow()
  })
  it('should reject objects', function () {
    expect(function () {
      romans.romanize(
        // @ts-expect-error
        { value: 1000 }
      )
    }).toThrow()
  })
  it('should reject float values', function () {
    expect(function () {
      romans.romanize(567.789)
    }).toThrow()
  })
})

describe('it should return solid integer numbers', function () {
  /** @type {string[]} */
  const testIntegers = []
  for (var i = 0; i < 35; i++) {
    var obj = getRandomInt(1, 3999)
    testIntegers.push(romans.romanize(obj))
  }
  it('should convert all numbers', function () {
    expect(validateForType(testIntegers, 'string')).toBeTruthy()
  })
})
describe('should have a consistent api signature', function () {
  expect(romans).toHaveProperty('romanize')
  expect(romans).toHaveProperty('deromanize')
  expect(romans).toHaveProperty('allChars')
  expect(romans).toHaveProperty('allNumerals')
})

/**
 * @typedef {{ "string": string; "number": number; "bigint": bigint; "boolean": boolean; "symbol": symbol; "undefined": undefined; "object": object; "function": Function; }} PrimitiveNameMap
 */

/**
 * @typedef {keyof PrimitiveNameMap} PrimitiveName
 */

/**
 * @template {PrimitiveName} T
 * @typedef {PrimitiveNameMap[T]} Primitive
 */

/**
 * @template {PrimitiveName} T
 * @param {PrimitiveNameMap[T][]} arrayToCheck
 * @param {T} expectedType
 * @returns {arrayToCheck is PrimitiveNameMap[T][]}
 */
function validateForType(arrayToCheck, expectedType) {
  for (var i = 0; i < arrayToCheck.length; i++) {
    var value = arrayToCheck[i]
    if (typeof value !== expectedType) {
      return false
    }
  }
  return true
}

/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
