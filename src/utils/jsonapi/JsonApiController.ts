import { Get, Query } from '@nestjs/common'

import { buildJsonApiResponse } from './builders'
import {
  JsonApiControllerConfig,
  JsonApiQuery,
  JsonApiResponseBuilder,
  PartiallyOptional,
  RawDataPayload,
} from './jsonapi.types'

type InitialConfig = PartiallyOptional<
  JsonApiControllerConfig,
  'relationshipNames' | 'validFields' | 'validIncludes'
>

export abstract class JsonApiController {
  protected config: JsonApiControllerConfig
  protected buildResponse: JsonApiResponseBuilder

  constructor(config: InitialConfig) {
    this.config = {
      relationshipNames: config.relationshipNames || [],
      type: config.type,
      validFields: config.validFields || [],
      validIncludes: config.validIncludes || [],
    }

    this.buildResponse = buildJsonApiResponse(this.config)
  }

  @Get()
  async list(@Query() query: JsonApiQuery, payload: RawDataPayload) {
    return this.buildResponse(query, payload)
  }
}
