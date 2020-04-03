import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthorsController } from './authors.controller'
import { Author } from './author.entity'
import { AuthorsService } from './authors.service'

@Module({
  controllers: [AuthorsController],
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorsService],
})
export class AuthorsModule {}
