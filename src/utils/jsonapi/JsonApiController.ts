import { Get, Query } from '@nestjs/common'
import * as R from 'ramda'

import { JsonApiQuery } from './jsonapi.types'
import { buildResourceObject } from './utils'

type RawDataPayload = {
  data: any
  included?: any
}

export abstract class JsonApiController {
  protected resourceName: string
  protected validFields: string[] = []
  protected validIncludes: string[] = []

  @Get()
  async list(@Query() query: JsonApiQuery, rawDataPayload: RawDataPayload) {
    const { data: rawData, included: rawIncluded } = rawDataPayload

    const dataBuilder = buildResourceObject({
      relationshipNames: this.validIncludes,
      query,
      type: this.resourceName,
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
}
