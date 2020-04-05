import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common'

import { JsonApiControllerConfig, JsonApiInterceptor } from 'src/utils/jsonapi'
import { AuthorsService } from './authors.service'

const jsonApiConfig: JsonApiControllerConfig = {
  type: 'author',
  validFields: ['firstName', 'lastName', 'createdAt', 'updatedAt'],
}

@Controller('api/v1/authors')
@UseInterceptors(new JsonApiInterceptor(jsonApiConfig))
export class AuthorsController {
  constructor(private readonly authorsSvc: AuthorsService) {}

  @Get()
  async list() {
    const data = await this.authorsSvc.find()

    return { data }
  }

  @Get(':id')
  async detail(@Param() params) {
    const { id } = params
    const data = await this.authorsSvc.findOne(id)

    return { data }
  }

  @Post()
  async create(@Body() body) {
    const author = await this.authorsSvc.create(body)

    return { data: author }
  }
}
