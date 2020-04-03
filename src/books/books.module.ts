import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Author, AuthorsService } from 'src/authors'

import { BooksController } from './books.controller'
import { Book } from './book.entity'
import { BooksService } from './books.service'

@Module({
  controllers: [BooksController],
  imports: [TypeOrmModule.forFeature([Author, Book])],
  providers: [BooksService, AuthorsService],
})
export class BooksModule {}
