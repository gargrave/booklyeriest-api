import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import * as R from 'ramda'

import { AuthorsService } from 'src/authors'
import { JsonApiController, JsonApiQuery } from 'src/utils/jsonapi'

import { BooksService } from './books.service'

const getUniqueAuthorIds = R.pipe(R.pluck('author'), R.uniq)

@Controller('api/v1/books')
export class BooksController extends JsonApiController {
  constructor(
    private readonly booksSvc: BooksService,
    private readonly authorsSvc: AuthorsService,
  ) {
    super({
      relationshipNames: ['author'],
      type: 'book',
      validFields: ['title', 'createdAt', 'updatedAt'],
      validIncludes: ['author'],
    })
  }

  @Get()
  async list(@Query() query: JsonApiQuery) {
    const data = await this.booksSvc.find()

    const authorIds = (getUniqueAuthorIds(data) as unknown) as string[]
    const includedAuthors = await this.authorsSvc.findByIds(authorIds)

    return super.list(query, {
      data,
      included: {
        author: includedAuthors,
      },
    })
  }

  @Get(':id')
  async detail(@Param() params) {
    const { id } = params
    const book = await this.booksSvc.findOne(id)

    return {
      data: book,
    }
  }

  @Post()
  async create(@Body() body) {
    const book = await this.booksSvc.create(body)

    return {
      data: book,
    }
  }
}
