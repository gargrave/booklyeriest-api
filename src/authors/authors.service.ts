import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DeepPartial, In, DeleteResult } from 'typeorm'

import { DbQueryOptions } from 'src/utils'

import { Author } from './author.entity'

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorsRepo: Repository<Author>,
  ) {}

  find({ where }: DbQueryOptions = {}): Promise<Author[]> {
    return this.authorsRepo.find({
      where,
    })
  }

  findByIds(ids: string[]): Promise<Author[]> {
    return this.authorsRepo.findByIds(ids)
  }

  findOne(id: string): Promise<Author> {
    return this.authorsRepo.findOne(id)
  }

  create(body: DeepPartial<Author>): Promise<Author> {
    const author = new Author()
    author.firstName = body.firstName
    author.lastName = body.lastName

    return this.authorsRepo.save(author)
  }

  async update(id: string, body: DeepPartial<Author>): Promise<Author> {
    const author = await this.authorsRepo.findOneOrFail(id)
    const updatedAuthor = {
      ...author,
      ...body,
    }

    return this.authorsRepo.save(updatedAuthor)
  }

  delete(id: string): Promise<DeleteResult> {
    return this.authorsRepo.delete(id)
  }
}
