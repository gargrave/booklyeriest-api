import { Body, Controller, Get, Param, Post } from '@nestjs/common'

import { AuthorsService } from './authors.service'

@Controller('api/v1/authors')
export class AuthorsController {
  constructor(private readonly svc: AuthorsService) {}

  @Get()
  async list() {
    const authors = await this.svc.findAll()

    return {
      data: authors,
    }
  }

  @Get(':id')
  async detail(@Param() params) {
    const { id } = params
    const author = await this.svc.findOne(id)

    return {
      data: author,
    }
  }

  @Post()
  async create(@Body() body) {
    const author = await this.svc.create(body)

    return {
      data: author,
    }
  }
}
