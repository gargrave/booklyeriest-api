import { NestFactory } from '@nestjs/core'

import { AppModule } from './app'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: 'http://localhost:3000',
  })
  await app.listen(8080)
}
bootstrap()
