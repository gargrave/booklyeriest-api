import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { Response } from 'express'

import { JsonApiException } from '../exceptions'

@Catch(JsonApiException)
export class JsonApiExceptionFilter implements ExceptionFilter {
  catch(exception: JsonApiException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    const { errors } = exception

    response.status(status).json({ errors })
  }
}
