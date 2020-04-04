import * as R from 'ramda'

/** Returns the value directly if it passes a "not empty" check; otherwise returns undefined */
export const omitIfEmpty = R.ifElse(R.isEmpty, R.always(undefined), R.identity)
