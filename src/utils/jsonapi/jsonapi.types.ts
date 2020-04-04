export type KeyToStringMap = {
  [key: string]: string
}

export type JsonApiQuery = {
  fields?: KeyToStringMap
  include?: KeyToStringMap
}

export type ResourceBuilderConfig = {
  query: JsonApiQuery
  relationshipNames?: string[]
  type: string
}
