import * as R from 'ramda'

/**
 * Returns the value directly if it passes a "not empty" check; otherwise returns undefined
 */
export const omitIfEmpty = R.ifElse(R.isEmpty, R.always(undefined), R.identity)

/**
 * Returns a function to either `map` across an Array of values, or simply call it directly for a single value.
 * Note that this returns a curried function where the fist call is the function you want to map/call, while the
 * second call is the actual value you want to to use.
 */
export const mapIfArray = R.ifElse(R.flip(R.is(Array)), R.map, R.call)

/**
 * Returns an Array of the provided value.
 * - If the value is already an Array, it will return it directly
 * - If the value is not an Array, it will return the value as a single-index Array
 */
export const ensureArray = R.ifElse(R.is(Array), R.identity, (x) => [x])
