import { ensureArray, mapIfArray } from './misc.utils'

describe('Misc Utils', () => {
  describe('mapIfEmpty', () => {
    it('calls the function directly if a single value is received', () => {
      const mockFn = jest.fn()
      const value = 42
      mapIfArray(mockFn)(value)

      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith(value)
    })

    it('calls the function "n" times, once for each value, if an Array is received', () => {
      const mockFn = jest.fn()
      const values = [42, 43, 44]
      mapIfArray(mockFn)(values)

      expect(mockFn).toHaveBeenCalledTimes(values.length)
      values.forEach((value, idx) => {
        expect(mockFn).toHaveBeenNthCalledWith(idx + 1, value)
      })
    })
  })

  describe('ensureArray', () => {
    it('returns an existing Array directly, with no changes', () => {
      const orig = [1, 2, 3]
      const result = ensureArray(orig)

      expect(result).toBe(orig)
      expect(result).toEqual(orig)
    })

    it('returns a non-Array value as a new Array', () => {
      const obj = { id: '123', name: 'Billy Pickles' }
      const result = ensureArray(obj)

      expect(result).toEqual([obj])
    })
  })
})
