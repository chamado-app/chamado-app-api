import { type ModuleMetadata, type Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PgRoleEntity, PgUserEntity } from '@/data/database/pg/entities'
import {
  makeCreateUserUsecaseProvider,
  makeHashGeneratorFactory,
  makeRoleRepository,
  makeUserRepository
} from '@/main/factories'
import { UserController } from '@/presentation/controllers'

export const makeUsersModuleMetadata = (): ModuleMetadata => {
  const database = TypeOrmModule.forFeature([PgUserEntity, PgRoleEntity])
  const providers: Provider[] = [
    makeUserRepository(),
    makeRoleRepository(),
    makeHashGeneratorFactory(),
    makeCreateUserUsecaseProvider()
  ]
  const imports = [database]
  const exports = [database, ...providers]
  const controllers = [UserController]

  return { providers, controllers, imports, exports }
}
