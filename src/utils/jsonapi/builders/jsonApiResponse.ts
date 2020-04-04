import * as R from 'ramda'

import { buildResourceObject } from './resourceObject'
import {
  JsonApiQuery,
  RawDataPayload,
  JsonApiControllerConfig,
  JsonApiResponse,
} from '../jsonapi.types'

export const buildJsonApiResponse = (
  controllerConfig: JsonApiControllerConfig,
) => (query: JsonApiQuery, payload: RawDataPayload): JsonApiResponse => {
  const { type, validIncludes } = controllerConfig
  const { data: rawData, included: rawIncluded } = payload

  const dataBuilder = buildResourceObject({
    relationshipNames: validIncludes,
    query,
    type,
  })
  const data = rawData.map(dataBuilder)

  const includedKeys = R.keys(rawIncluded) as string[]

  const included = includedKeys.reduce((acc, key) => {
    const builder = buildResourceObject({
      query,
      type: key,
    })
    const includedDataset = rawIncluded[key]

    return acc.concat(includedDataset.map(builder))
  }, [])

  return { data, included }
}
