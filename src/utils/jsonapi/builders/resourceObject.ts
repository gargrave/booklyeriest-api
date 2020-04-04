import * as R from 'ramda'

import {
  RawResource,
  ResourceBuilderConfig,
  ResourceObject,
} from '../jsonapi.types'
import { parseFieldsFromQuery, splitAttrs } from '../utils'
import { buildRelationshipsObject } from './relationshipsObject'

export const buildResourceObject = (config: ResourceBuilderConfig) => {
  return (obj: RawResource): ResourceObject => {
    const { query, type } = config
    const { id, ...allAttributes } = obj

    const [ownAttrs, relationshipsAttrs] = splitAttrs(config, allAttributes)
    const fields = parseFieldsFromQuery(query, type) || R.keys(allAttributes)
    const attributes = R.pick(fields as any, ownAttrs)

    const relationships = buildRelationshipsObject(config, relationshipsAttrs)

    return {
      id,
      type,
      attributes,
      relationships,
    }
  }
}
