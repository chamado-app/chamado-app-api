import { type ModuleMetadata, type Provider, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PgTokenEntity } from '@/data/database/pg/entities'
import { AuthController } from '@/presentation/controllers'
import {
  makeAuthenticateUsecaseProvider,
  makeTokenRepository
} from '@/presentation/factories'
import { UserModule } from '@/presentation/modules'

export const makeAuthModuleMetadata = (): ModuleMetadata => {
  const database = TypeOrmModule.forFeature([PgTokenEntity])
  const imports = [forwardRef(() => UserModule), database]
  const controllers = [AuthController]

  const providers: Provider[] = [
    makeTokenRepository(),
    makeAuthenticateUsecaseProvider()
  ]

  return { imports, providers, controllers }
}
