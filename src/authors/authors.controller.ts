import { Controller, Get } from '@nestjs/common'
import { AuthorsService } from './authors.service'

@Controller('api/v1/authors')
export class AuthorsController {
  constructor(private readonly appService: AuthorsService) {}

  @Get()
  list() {
    return {
      data: 'authors-list',
    }
  }
}
