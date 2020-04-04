import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'

import { JsonApiController, JsonApiQuery } from 'src/utils/jsonapi'

import { AuthorsService } from './authors.service'

@Controller('api/v1/authors')
export class AuthorsController extends JsonApiController {
  constructor(private readonly svc: AuthorsService) {
    super()

    this.resourceName = 'author'
    this.validFields = ['firstName', 'lastName', 'createdAt', 'updatedAt']
  }

  @Get()
  async list(@Query() query: JsonApiQuery) {
    const data = await this.svc.findAll()
    return super.list(query, { data })
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
