import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DeepPartial } from 'typeorm'

import { Author } from './author.entity'

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorsRepo: Repository<Author>,
  ) {}

  findAll(): Promise<Author[]> {
    return this.authorsRepo.find()
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
}
