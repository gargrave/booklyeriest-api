import {
  JsonApiControllerConfig,
  JsonApiQuery,
  RawDataPayload,
} from '../jsonapi.types'

import {
  buildJsonApiResponse,
  _getResponseData,
  _getResponseIncludedData,
} from './jsonApiResponse'

const authors = [
  {
    id: 'author1',
    firstName: 'Kurt',
    lastName: 'Vonnegut',
    createdAt: '123',
    updatedAt: '456',
  },
  {
    id: 'author2',
    firstName: 'Stephen',
    lastName: 'King',
    createdAt: '321',
    updatedAt: '654',
  },
]

const books = [
  {
    id: 'book1',
    title: 'Slaughterhouse Five',
    author: 'author1',
    createdAt: '123',
    updatedAt: '456',
  },
  {
    id: 'book2',
    title: 'The Shining',
    author: 'author2',
    createdAt: '321',
    updatedAt: '654',
  },
]

const booksResponse = [
  {
    id: 'book1',
    type: 'book',
    attributes: {
      title: 'Slaughterhouse Five',
    },
    relationships: {
      author: {
        data: {
          id: 'author1',
          type: 'author',
        },
      },
    },
  },
  {
    id: 'book2',
    type: 'book',
    attributes: {
      title: 'The Shining',
    },
    relationships: {
      author: {
        data: {
          id: 'author2',
          type: 'author',
        },
      },
    },
  },
]

const authorsResponse = [
  {
    id: 'author1',
    type: 'author',
    attributes: {
      firstName: 'Kurt',
      lastName: 'Vonnegut',
    },
  },
  {
    id: 'author2',
    type: 'author',
    attributes: {
      firstName: 'Stephen',
      lastName: 'King',
    },
  },
]

describe('jsonApiResponse', () => {
  let controllerConfig: JsonApiControllerConfig
  let query: JsonApiQuery
  let payload: RawDataPayload

  beforeEach(() => {
    controllerConfig = {
      relationshipNames: ['author'],
      type: 'book',
      validFields: ['title', 'createdAt', 'updatedAt'],
      validIncludes: ['author'],
    }

    query = {
      fields: {
        author: 'firstName,lastName',
        book: 'title,author',
      },
      include: 'author',
    }

    payload = {
      data: books,
      included: {
        author: authors,
      },
    }
  })

  describe('_getResponseData', () => {
    it('correctly parses "data" for the response', () => {
      const result = _getResponseData(controllerConfig, query, payload)

      expect(result).toMatchObject(booksResponse)
    })
  })

  describe('_getResponseIncludedData', () => {
    it('correctly parses "included data" for the response', () => {
      const result = _getResponseIncludedData(controllerConfig, query, payload)

      expect(result).toMatchObject(authorsResponse)
    })
  })

  describe('buildJsonApiResponse', () => {
    it('builds the full response correctly', () => {
      const result = buildJsonApiResponse(controllerConfig)(query, payload)

      expect(result).toMatchObject({
        data: booksResponse,
        included: authorsResponse,
      })
    })

    it('returns empty data correctly if there is no data to return', () => {
      const result = buildJsonApiResponse(controllerConfig)(query, { data: [] })

      expect(result).toMatchObject({
        data: [],
      })
    })
  })
})
