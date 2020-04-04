export type KeyToStringMap = {
  [key: string]: string
}

export type WhereClause = KeyToStringMap | KeyToStringMap[]

export type DbQueryOptions = {
  ids?: string[]
  where?: WhereClause
}
