import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { buildJsonApiResponse } from './builders'
import {
  JsonApiControllerConfig,
  JsonApiInterceptorConfig,
  JsonApiResponseBuilder,
} from './jsonapi.types'

/**
 * An interceptor to convert basic API responses into properly-formatted JSON:API responses.
 */
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
    }

    this.buildResponse = buildJsonApiResponse(this.config)
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const query = context.switchToHttp().getRequest().query

    return next.handle().pipe(
      map((response) => {
        return this.buildResponse(query, response)
      }),
    )
  }
}
