import { Body, Controller, Get, Param, Post } from '@nestjs/common'

import { BooksService } from './books.service'

@Controller('api/v1/books')
export class BooksController {
  constructor(private readonly svc: BooksService) {}

  @Get()
  async list() {
    const books = await this.svc.findAll()

    return {
      data: books,
    }
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
