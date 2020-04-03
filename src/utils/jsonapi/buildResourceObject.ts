import * as R from 'ramda'

import { buildRelationships } from './buildRelationships'
import { parseQueryFields } from './parseQueryFields'
import { JsonApiQuery } from './jsonapi.types'
import { splitAttrs } from './splitAttrs'

// TODO: type query as a JsonApi Query object

export function buildResourceObject<T>(type: string, query: JsonApiQuery) {
  return (obj: any) => {
    const { id, ...allAttributes } = obj

    const [ownAttrs, relationshipsAttrs] = splitAttrs<T>(allAttributes)
    const fields = parseQueryFields(query, type) || R.keys(allAttributes)
    const attributes = R.pick(fields as any, ownAttrs)

    const relationships = buildRelationships(relationshipsAttrs, fields)
    console.log({ relationships })

    return {
      id,
      type,
      attributes,
      relationships,
    }
  }
}
