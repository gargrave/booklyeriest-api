import { HttpException, HttpStatus } from '@nestjs/common'

type JsonApiExceptionBody = {
  status: HttpStatus
  title: string
  detail?: string
}

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
