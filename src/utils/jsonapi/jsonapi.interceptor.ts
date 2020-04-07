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
import { InvalidAttributeException } from './exceptions'

const MODIFYABLE_REQUEST_TYPES = ['POST', 'PUT', 'PATCH']
const MODIFYABLE_RESPONSE_TYPES = ['GET', 'POST', 'PUT', 'PATCH']
const shouldModifyRequest = R.flip(R.includes)(MODIFYABLE_REQUEST_TYPES)
const shouldModifyResponse = R.flip(R.includes)(MODIFYABLE_RESPONSE_TYPES)

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
    const { type } = this.config

    const updateRequest = shouldModifyRequest(method)
    const updateResponse = shouldModifyResponse(method)

    if (updateRequest) {
      const { attributes } = request.body.data
      const { relationships = {} } = request.body

      const flattenRelationKeys = (acc, key) => {
        acc[key] = relationships[key].data.id
        return acc
      }

      // TODO: consider moving field validation to a pipe
      const invalidFields = R.difference(
        R.keys(attributes) as string[],
        this.config.writeableFields,
      )
      if (invalidFields.length) {
        throw new InvalidAttributeException(invalidFields, type)
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
        return updateResponse ? this.buildResponse(query, response) : response
      }),
    )
  }
}
