import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { useValidationPipe } from './pipes'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { cors: true })

  useValidationPipe(app)

  await app.listen(process.env.PORT ?? 3000)
}

void bootstrap()
