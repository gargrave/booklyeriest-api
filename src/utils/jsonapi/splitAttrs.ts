import * as R from 'ramda'

const IGNORED_ATTRS = ['id']
const RELATIONSHIP_SUFFIX = 'Id'

const isIgnoredAttr = R.flip(R.includes)(IGNORED_ATTRS)
const hasRelSuffix = R.includes(RELATIONSHIP_SUFFIX)

const isBaseAttr = R.allPass([
  R.complement(isIgnoredAttr),
  R.complement(hasRelSuffix),
])

const isRelAttr = R.allPass([hasRelSuffix])

/**
 * Takes all of an object's "attributes" and splits them into two sets:
 * - The object's "own" attributes
 * - The object's relationship/foreign key attributes
 *
 * Returns an array where [0] is the base attrs and [1] is the relationship attrs
 */
export function splitAttrs<T>(allAttrs: T): [Partial<T>, Partial<T>] {
  const allAttrKeys = R.keys<T>(allAttrs)

  // parse the keys for base attributes and "relationships" identifiers
  const baseAttrKeys = R.filter<string>(isBaseAttr, allAttrKeys)
  const relAttrKeys = R.filter<string>(isRelAttr, allAttrKeys)

  return [
    R.pick(baseAttrKeys, allAttrs) as Partial<T>,
    R.pick(relAttrKeys, allAttrs) as Partial<T>,
  ]
}
