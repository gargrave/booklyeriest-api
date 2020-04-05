import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import * as R from 'ramda'

import { AuthorsService } from 'src/authors'
import { JsonApiControllerConfig, JsonApiInterceptor } from 'src/utils/jsonapi'
import { BooksService } from './books.service'

const getUniqueAuthorIds = R.pipe(R.pluck('author'), R.uniq)

const jsonApiConfig: JsonApiControllerConfig = {
  relationshipNames: ['author'],
  type: 'book',
  validFields: ['title', 'createdAt', 'updatedAt'],
  validIncludes: ['author'],
  writeableFields: ['title'],
}

@Controller('api/v1/books')
@UseInterceptors(new JsonApiInterceptor(jsonApiConfig))
export class BooksController {
  constructor(
    private readonly booksSvc: BooksService,
    private readonly authorsSvc: AuthorsService,
  ) {}

  @Get()
  async list() {
    const data = await this.booksSvc.find()

    const authorIds = (getUniqueAuthorIds(data) as unknown) as string[]
    const includedAuthors = await this.authorsSvc.findByIds(authorIds)

    return {
      data,
      included: {
        author: includedAuthors,
      },
    }
  }

  @Get(':id')
  async detail(@Param() params) {
    const { id } = params
    const data = await this.booksSvc.findOne(id)

    const authorIds = (getUniqueAuthorIds([data]) as unknown) as string[]
    const includedAuthors = await this.authorsSvc.findByIds(authorIds)

    return {
      data,
      included: {
        author: includedAuthors,
      },
    }
  }

  @Post()
  async create(@Body() body) {
    const data = await this.booksSvc.create(body)

    return {
      data,
    }
  }
}
