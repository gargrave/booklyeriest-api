import * as R from 'ramda'

import { ResourceBuilderConfig, ResourceObject } from '../jsonapi.types'
import { buildRelationships, parseQueryFields, splitAttrs } from '../utils'

// TODO: what is the correct type of "obj" here?
export const buildResourceObject = (config: ResourceBuilderConfig) => {
  return (obj: any): ResourceObject => {
    const { query, type } = config
    const { id, ...allAttributes } = obj

    const [ownAttrs, relationshipsAttrs] = splitAttrs(config, allAttributes)
    const fields = parseQueryFields(query, type) || R.keys(allAttributes)
    const attributes = R.pick(fields as any, ownAttrs)

    const relationships = buildRelationships(relationshipsAttrs as any)

    return {
      id,
      type,
      attributes,
      relationships,
    }
  }
}
