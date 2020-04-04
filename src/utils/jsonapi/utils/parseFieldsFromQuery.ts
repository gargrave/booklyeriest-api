import * as R from 'ramda'

import { JsonApiQuery } from '../jsonapi.types'

export function parseFieldsFromQuery<T = string[] | undefined>(
  query: JsonApiQuery,
  type: string,
): T {
  const splitFields = R.split(',')
  const fieldsQuery = query.fields?.[type]

  return (fieldsQuery && (splitFields(fieldsQuery) as unknown)) as T
}
