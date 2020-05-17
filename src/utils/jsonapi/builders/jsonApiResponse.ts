import * as R from 'ramda'

import {
  JsonApiQuery,
  RawDataPayload,
  JsonApiControllerConfig,
  JsonApiDataset,
  JsonApiResponse,
  JsonApiRequest,
} from '../jsonapi.types'
import { buildResourceObject } from './resourceObject'
import { mapIfArray, omitIfEmpty } from '../utils'

export const _getResponseData = (
  controllerConfig: JsonApiControllerConfig,
  query: JsonApiQuery,
  payload: RawDataPayload,
): JsonApiDataset => {
  const { relationshipNames, type } = controllerConfig
  const { data: rawData } = payload

  const dataBuilder = mapIfArray(
    buildResourceObject({
      query,
      relationshipNames,
      type,
    }),
  )

  return dataBuilder(rawData)
}

export const _getResponseIncludedData = (
  controllerConfig: JsonApiControllerConfig,
  query: JsonApiQuery,
  payload: RawDataPayload,
): JsonApiDataset => {
  const { validIncludes } = controllerConfig
  const { included: rawIncluded = {} } = payload
  const { include = '' } = query

  const requestedIncludes = R.split(',', include)
  const validRequestedIncludes = R.intersection(
    requestedIncludes,
    validIncludes,
  )

  const mapIncludedData = (acc, key) => {
    const includedDataset = rawIncluded[key] || []
    const builder = buildResourceObject({
      query,
      type: key,
    })

    return acc.concat(mapIfArray(builder)(includedDataset))
  }

  return omitIfEmpty(R.reduce(mapIncludedData, [], validRequestedIncludes))
}

export const buildJsonApiResponse = (
  controllerConfig: JsonApiControllerConfig,
) => (request: JsonApiRequest, payload: RawDataPayload): JsonApiResponse => {
  const { method, params, query } = request

  if (method === 'DELETE') {
    return {
      meta: { id: params.id },
    }
  }

  const data = _getResponseData(controllerConfig, query, payload)
  const included = _getResponseIncludedData(controllerConfig, query, payload)

  return { data, included }
}
