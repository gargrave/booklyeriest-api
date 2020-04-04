type Diff<T, U> = T extends U ? never : T

export type PartiallyOptional<T, TOptional extends keyof T> = Pick<
  T,
  Diff<keyof T, TOptional>
> &
  Partial<T>

/**************************************************
 * JSON:API Spec Types
 **************************************************/
export type MetaObject = {
  [key: string]: ValidJsonValue
}

export type LinkObject = {
  href: string
  meta?: MetaObject
}

export type ResourceIdentifier = {
  id: string
  type: string
  meta?: MetaObject
}

export type RelationshipsObject = {
  [key: string]: {
    data: ResourceIdentifier | ResourceIdentifier[]
    links?: {
      [key: string]: LinkObject
    }
  }
}

export type ResourceObject = ResourceIdentifier & {
  attributes: {
    [key: string]: ValidJsonValue
  }
  links?: {
    [key: string]: LinkObject
  }
  relationships?: RelationshipsObject
}

/**************************************************
 * Utility Types
 **************************************************/
type ValidJsonValue = string | number | boolean | any[] | {}

type KeyToStringMap = {
  [key: string]: string
}

export type JsonMap = {
  [key: string]: ValidJsonValue
}

export type RawResource = {
  id: string
  [key: string]: ValidJsonValue
}

export type RawDataPayload = {
  data: any
  included?: any
}

export type JsonApiControllerConfig = {
  type: string
  validFields: string[]
  validIncludes: string[]
}

export type JsonApiQuery = {
  fields?: KeyToStringMap
  include?: KeyToStringMap
}

export type JsonApiResponse = {
  data: ResourceObject | ResourceObject[]
  included?: ResourceObject | ResourceObject[]
}

export type JsonApiResponseBuilder = (
  query: JsonApiQuery,
  payload: RawDataPayload,
) => JsonApiResponse

export type ResourceBuilderConfig = {
  query: JsonApiQuery
  relationshipNames?: string[]
  type: string
}
