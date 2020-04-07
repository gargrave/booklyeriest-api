import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import * as R from 'ramda'

import { AuthorsService } from 'src/authors'
import {
  ensureArray,
  JsonApiControllerConfig,
  JsonApiInterceptor,
} from 'src/utils/jsonapi'

import { Book } from './book.entity'
import { BooksService } from './books.service'

const getUniqueAuthorIds = R.pipe(R.pluck('author'), R.uniq)

const getIncludedAuthors = (service: AuthorsService, data: Book | Book[]) => {
  const dataArr = ensureArray(data)
  const authorIds = (getUniqueAuthorIds(dataArr) as unknown) as string[]

  return service.findByIds(authorIds)
}

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
    const includedAuthors = await getIncludedAuthors(this.authorsSvc, data)

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
    const includedAuthors = await getIncludedAuthors(this.authorsSvc, data)

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
    const includedAuthors = await getIncludedAuthors(this.authorsSvc, data)

    return {
      data,
      included: {
        author: includedAuthors,
      },
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body) {
    const data = await this.booksSvc.update(id, body)
    const includedAuthors = await getIncludedAuthors(this.authorsSvc, data)

    return {
      data,
      included: {
        author: includedAuthors,
      },
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const data = await this.booksSvc.delete(id)

    return data
  }
}
