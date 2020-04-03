import * as R from 'ramda'

const makeRelationship = (requestFields) => (acc, [relKey, id]) => {
  const key = R.replace(/_id/, '', relKey)
  const isValidKey = R.anyPass([R.includes(key), R.includes(relKey)])

  if (isValidKey(requestFields)) {
    acc[key] = {
      data: {
        id,
        type: `${key}s`,
      },
    }
  }
  return acc
}

/**
 * Returns the value directly if it passes a "not empty" check; otherwise returns undefined
 */
const notEmptyOrUndefined = R.ifElse(R.isEmpty, R.always(undefined), R.identity)

export const buildRelationships = (relationshipsAttrs, requestFields) => {
  const reduceRelationships = R.reduce(makeRelationship(requestFields), {})
  const processRelationships = R.pipe(reduceRelationships, notEmptyOrUndefined)

  return processRelationships(R.toPairs(relationshipsAttrs))
}
