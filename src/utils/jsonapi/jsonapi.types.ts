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

export type JsonApiInterceptorConfig = {
  relationshipNames: string[]
  type: string
  validFields: string[]
  validIncludes: string[]
  writeableFields: string[]
}

export type JsonApiControllerConfig = PartiallyOptional<
  JsonApiInterceptorConfig,
  'relationshipNames' | 'validFields' | 'validIncludes' | 'writeableFields'
>

export type JsonApiRequest = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  params: { [key: string]: string }
  query: JsonApiQuery
}

export type JsonApiQuery = {
  fields?: KeyToStringMap
  include?: string
}

export type JsonApiDataset = ResourceObject | ResourceObject[]

export type JsonApiResponse = {
  data?: JsonApiDataset
  included?: JsonApiDataset
  meta?: {}
}

export type JsonApiResponseBuilder = (
  request: JsonApiRequest,
  payload: RawDataPayload,
) => JsonApiResponse

export type ResourceBuilderConfig = {
  query: JsonApiQuery
  relationshipNames?: string[]
  type: string
}
