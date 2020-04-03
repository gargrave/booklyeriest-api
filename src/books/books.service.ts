import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DeepPartial } from 'typeorm'

import { Book } from './book.entity'

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private repo: Repository<Book>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.repo.find()
  }

  findOne(id: string): Promise<Book> {
    return this.repo.findOne(id)
  }

  create(body: DeepPartial<Book>): Promise<Book> {
    const book = new Book()
    book.title = body.title

    return this.repo.save(book)
  }
}
