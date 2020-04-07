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
    const author = await this.authorsRepo.findOneOrFail(body.author)

    book.title = body.title
    book.author = author

    return this.booksRepo.save(book)
  }

  async update(id: string, body: DeepPartial<Book>): Promise<Book> {
    const book = await this.booksRepo.findOneOrFail(id)

    const updatedBook = {
      ...book,
      ...body,
    }

    return this.booksRepo.save(updatedBook)
  }

  delete(id: string): Promise<DeleteResult> {
    return this.booksRepo.delete(id)
  }
}
