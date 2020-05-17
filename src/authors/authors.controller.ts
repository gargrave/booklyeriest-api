import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common'

import {
  JsonApiControllerConfig,
  JsonApiInterceptor,
  JsonApiExceptionFilter,
} from 'src/utils/jsonapi'
import { AuthorsService } from './authors.service'

const jsonApiConfig: JsonApiControllerConfig = {
  type: 'author',
  validFields: ['firstName', 'lastName', 'createdAt', 'updatedAt'],
  writeableFields: ['firstName', 'lastName'],
}

@Controller('api/v1/authors')
@UseFilters(JsonApiExceptionFilter)
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
    const data = await this.authorsSvc.create(body)

    return { data }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body) {
    const data = await this.authorsSvc.update(id, body)

    return { data }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const data = await this.authorsSvc.delete(id)

    return { data }
  }
}
