import * as R from 'ramda'

import { KeyToStringMap, ResourceBuilderConfig } from '../jsonapi.types'

/**
 * Takes all of an object's "attributes" and splits them into two sets:
 * - The object's "own" attributes
 * - The object's relationship/foreign key attributes
 *
 * Returns an array where [0] is the base attrs and [1] is the relationship attrs
 */
export const splitAttrs = (
  config: ResourceBuilderConfig,
  allAttrs: KeyToStringMap,
): [KeyToStringMap, KeyToStringMap] => {
  const { relationshipNames = [] } = config

  return [
    R.omit(relationshipNames, allAttrs),
    R.pick(relationshipNames, allAttrs),
  ]
}
