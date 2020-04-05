import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import * as R from 'ramda'

import { buildJsonApiResponse } from './builders'
import {
  JsonApiControllerConfig,
  JsonApiInterceptorConfig,
  JsonApiResponseBuilder,
} from './jsonapi.types'

const WRITE_REQUESTS = ['POST', 'PUT', 'PATCH']
const isWriteRequest = R.flip(R.includes)(WRITE_REQUESTS)

@Injectable()
export class JsonApiInterceptor implements NestInterceptor {
  protected config: JsonApiInterceptorConfig
  protected buildResponse: JsonApiResponseBuilder

  constructor(partialConfig: JsonApiControllerConfig) {
    this.config = {
      relationshipNames: partialConfig.relationshipNames || [],
      type: partialConfig.type,
      validFields: partialConfig.validFields || [],
      validIncludes: partialConfig.validIncludes || [],
      writeableFields: partialConfig.writeableFields || [],
    }

    this.buildResponse = buildJsonApiResponse(this.config)
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const { method, query } = request

    if (isWriteRequest(method)) {
      const { attributes } = request.body.data
      const { relationships = {} } = request.body

      const flattenRelationKeys = (acc, key) => {
        acc[key] = relationships[key].data.id
        return acc
      }

      const writeableFields = R.pick(this.config.writeableFields, attributes)

      const writeableRelations = R.pipe(
        R.reduce(flattenRelationKeys, {}),
        R.pick(this.config.relationshipNames),
      )(R.keys(relationships))

      request.body = {
        ...writeableFields,
        ...writeableRelations,
      }
    }

    return next.handle().pipe(
      map((response) => {
        return this.buildResponse(query, response)
      }),
    )
  }
}
