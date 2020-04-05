import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DeepPartial, DeleteResult } from 'typeorm'

import { Author } from 'src/authors/author.entity'
import { DbQueryOptions } from 'src/utils'

import { Book } from './book.entity'

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepo: Repository<Book>,
    @InjectRepository(Author)
    private authorsRepo: Repository<Author>,
  ) {}

  find({}: DbQueryOptions = {}): Promise<Book[]> {
    return this.booksRepo.find({
      loadRelationIds: true,
    })
  }

  findOne(id: string): Promise<Book> {
    return this.booksRepo.findOne(id, {
      loadRelationIds: true,
    })
  }

  async create(body: DeepPartial<Book>): Promise<Book> {
    const book = new Book()
    const author = await this.authorsRepo.findOne(body.author)

    book.title = body.title
    book.author = author

    return this.booksRepo.save(book)
  }

  delete(id: string): Promise<DeleteResult> {
    return this.booksRepo.delete(id)
  }
}
