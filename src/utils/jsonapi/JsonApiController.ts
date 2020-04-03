import { Get, Query } from '@nestjs/common'

import { buildResourceObject } from './buildResourceObject'
import { JsonApiQuery } from './jsonapi.types'

type RawDataPayload = {
  data: any
  relationships?: any
}

export abstract class JsonApiController {
  protected resourceName: string
  protected validFields: string[]

  constructor() {
    //
  }

  @Get()
  async list(@Query() query: JsonApiQuery, rawDataPayload: RawDataPayload) {
    const { data: rawData } = rawDataPayload
    console.log({ query })

    const builder = buildResourceObject(this.resourceName, query)
    const data = rawData.map(builder)

    return { data }
  }
}
