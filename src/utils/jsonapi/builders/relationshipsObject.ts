import * as R from 'ramda'

import {
  KeyToStringMap,
  RelationshipsObject,
  ResourceIdentifier,
} from '../jsonapi.types'

const makeRelationship = (acc, [type, id]): ResourceIdentifier => {
  acc[type] = {
    data: { id, type },
  }
  return acc
}

/**
 * Returns the value directly if it passes a "not empty" check; otherwise returns undefined
 */
const omitIfEmpty = R.ifElse(R.isEmpty, R.always(undefined), R.identity)

export const buildRelationshipsObject = (
  relationshipsAttrs: KeyToStringMap,
): RelationshipsObject => {
  const reduceRelationships = R.reduce(makeRelationship, {})
  const processRelationships = R.pipe(reduceRelationships, omitIfEmpty)

  return processRelationships(R.toPairs(relationshipsAttrs))
}
