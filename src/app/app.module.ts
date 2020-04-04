import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthorsModule } from 'src/authors/authors.module'
import { BooksModule } from 'src/books/books.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [TypeOrmModule.forRoot(), AuthorsModule, BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
