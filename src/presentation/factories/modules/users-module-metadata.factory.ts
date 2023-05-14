import { type ModuleMetadata, type Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PgUserEntity } from '@/data/database/pg/entities'
import { makeUserRepository } from '@/presentation/factories'

export const makeUsersModuleMetadata = (): ModuleMetadata => {
  const database = TypeOrmModule.forFeature([PgUserEntity])
  const providers: Provider[] = [makeUserRepository()]
  const imports = [database]
  const exports = [database, ...providers]

  return { providers, imports, exports }
}
