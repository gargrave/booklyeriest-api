import { HttpException, HttpStatus } from '@nestjs/common'

type JsonApiExceptionBody = {
  status: HttpStatus
  title: string
  detail?: string
}

/**
 * A base level-exception for use with JsonApiExceptionFilter.
 * This extends HttpException directly, and does not make any changes
 * to the existing functionality. It does add the following functionality:
 *
 * - Adds a local "errors" field, which is a set of one or more error messages
 *    formatted for the JSON:API spec: https://jsonapi.org/format/#error-objects
 */
export class JsonApiException extends HttpException {
  protected _errors: JsonApiExceptionBody[]

  constructor(response: string | Record<string, any>, status: number) {
    super(response, status)
    const errors = response as JsonApiExceptionBody[]

    if (!errors.length) {
      throw new Error('JsonApiException.errors must have at least one error.')
    }

    this._errors = errors
  }

  get errors() {
    return this._errors
  }
}
