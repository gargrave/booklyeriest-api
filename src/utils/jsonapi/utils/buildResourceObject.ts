import * as R from 'ramda'

import { ResourceBuilderConfig } from '../jsonapi.types'
import { buildRelationships, parseQueryFields, splitAttrs } from '.'

export const buildResourceObject = (config: ResourceBuilderConfig) => {
  return (obj: any) => {
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
