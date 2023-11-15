import { type ModuleMetadata, type Provider, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PgTokenEntity } from '@/data/database/pg/entities'
import {
  makeAuthenticateUsecaseProvider,
  makeHashComparerFactory,
  makeJwtGeneratorFactory,
  makeLogoutUsecaseProvider,
  makeTokenRepository
} from '@/main/factories'
import { UserModule } from '@/main/modules'
import { AuthController } from '@/presentation/controllers'

export const makeAuthModuleMetadata = (): ModuleMetadata => {
  const database = TypeOrmModule.forFeature([PgTokenEntity])
  const imports = [forwardRef(() => UserModule), database]
  const controllers = [AuthController]

  const providers: Provider[] = [
    makeTokenRepository(),
    makeHashComparerFactory(),
    makeJwtGeneratorFactory(),
    makeAuthenticateUsecaseProvider(),
    makeLogoutUsecaseProvider()
  ]

  return { imports, providers, controllers }
}
