import * as R from 'ramda'

import { JsonApiQuery } from './jsonapi.types'

export const parseQueryFields = (
  query: JsonApiQuery,
  type: string,
): string[] | undefined => {
  const splitFields = R.split(',')
  const fieldsQuery = query.fields?.[type]

  return fieldsQuery && splitFields(fieldsQuery)
}
