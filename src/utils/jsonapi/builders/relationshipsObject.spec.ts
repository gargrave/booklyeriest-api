import { buildRelationshipsObject } from './relationshipsObject'
import { ResourceBuilderConfig, JsonMap } from '../jsonapi.types'

describe('buildRelationshipsObject', () => {
  let config: ResourceBuilderConfig
  let relationIdsMap: JsonMap

  beforeEach(() => {
    config = {
      query: {
        fields: {
          author: 'firstName,lastName',
          book: 'title,author,publisher',
          publisher: 'name,location',
        },
      },
      relationshipNames: ['author', 'publisher'],
      type: 'book',
    }

    relationIdsMap = {
      author: 'author123',
      publisher: 'publisher123',
    }
  })

  it('correctly builds relationships object when all data is valid', () => {
    const result = buildRelationshipsObject(config, relationIdsMap)

    expect(result).toEqual({
      author: {
        data: { id: 'author123', type: 'author' },
      },
      publisher: {
        data: { id: 'publisher123', type: 'publisher' },
      },
    })
  })

  it("ignores relationships that are not specified in the type's 'fields' query", () => {
    // if we omit "publisher" from the book's fields, it should not be populated in the output
    const configWithoutPublisher = { ...config }
    config.query.fields.book = 'title,author'

    const result = buildRelationshipsObject(
      configWithoutPublisher,
      relationIdsMap,
    )

    expect(result).toEqual({
      author: {
        data: { id: 'author123', type: 'author' },
      },
    })
  })

  it('safely ignores specified relationships that do not exist in "relationIdsMap"', () => {
    const configWithExtraRelationshipName = {
      ...config,
      relationshipNames: [...config.relationshipNames, 'invalidRelationship'],
    }

    const result = buildRelationshipsObject(
      configWithExtraRelationshipName,
      relationIdsMap,
    )

    expect(result).toEqual({
      author: {
        data: { id: 'author123', type: 'author' },
      },
      publisher: {
        data: { id: 'publisher123', type: 'publisher' },
      },
    })
  })
})
