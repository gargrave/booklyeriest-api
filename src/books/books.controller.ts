import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'

import { AuthorsService } from 'src/authors'
import { JsonApiController, JsonApiQuery } from 'src/utils/jsonapi'

import { BooksService } from './books.service'

@Controller('api/v1/books')
export class BooksController extends JsonApiController {
  constructor(
    private readonly svc: BooksService,
    private readonly authorsSvc: AuthorsService,
  ) {
    super()
    this.resourceName = 'book'
    this.validFields = ['title', 'author', 'createdAt', 'updatedAt']
  }

  @Get()
  async list(@Query() query: JsonApiQuery) {
    const data = await this.svc.findAll()
    const relationships = await this.authorsSvc.findAll()
    console.log({ relationships })

    return super.list(query, { data, relationships })
  }

  @Get(':id')
  async detail(@Param() params) {
    const { id } = params
    const book = await this.svc.findOne(id)

    return {
      data: book,
    }
  }

  @Post()
  async create(@Body() body) {
    const book = await this.svc.create(body)

    return {
      data: book,
    }
  }
}
