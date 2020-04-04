import * as R from 'ramda'

import {
  JsonMap,
  RelationshipsObject,
  ResourceBuilderConfig,
  ResourceIdentifier,
} from '../jsonapi.types'
import { omitIfEmpty } from '../utils'

const makeRelationship = (acc, [type, id]): ResourceIdentifier => {
  acc[type] = {
    data: { id, type },
  }
  return acc
}

/** Converts an "relationships" map object into a comma-separate string of the keys therein */
const joinRelations = R.pipe(R.keys, R.join(','))

/**
 * Returns a JSON:API formatted "Relationships Object" based on the specified relationships in the provided data.
 * This is effectively an object called "relationships" that goes within a given ResourceObject with links or references
 * to the full data that should ultimately be "included" elsewhere in the request.
 *
 * https://jsonapi.org/format/#document-resource-object-relationships
 *
 * Note that this does not concern itself with "included" data, and thus does not need the full data
 * for the relationships objects.
 */
export const buildRelationshipsObject = (
  config: ResourceBuilderConfig,
  relationIdsMap: JsonMap,
): RelationshipsObject => {
  const { query, type } = config

  // ensure we only build "relationships" objects for fields specified in the query
  // if no `fields` query is specified for this type, we will include all relationships data
  const defaultRelations = joinRelations(relationIdsMap)
  const queryFields = query.fields?.[type] || defaultRelations
  const requestedFields = R.split(',', queryFields)
  const requestedRelationships = R.pick(requestedFields, relationIdsMap)

  const reduceRelationships = R.reduce(makeRelationship, {})
  const processRelationships = R.pipe(reduceRelationships, omitIfEmpty)

  return processRelationships(R.toPairs(requestedRelationships))
}
