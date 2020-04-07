import { HttpStatus } from '@nestjs/common'

import { JsonApiException } from './jsonapi.exception'

export class InvalidAttributeException extends JsonApiException {
  constructor(attributes: string[], type: string) {
    const errors = attributes.map((field: string) => ({
      status: HttpStatus.FORBIDDEN,
      title: 'Invalid Attribute',
      detail: `'${field}' is not a valid attribute for type '${type}'`,
    }))

    super(errors, HttpStatus.FORBIDDEN)
  }
}
