import { type Provider } from '@nestjs/common'
import { UserRepository } from 'src/core/repositories/user.repository'
import { PgUserEntity } from 'src/data/database/pg/entities/pg-user.entity'
import { PgUserRepository } from 'src/data/database/pg/repositories/pg-user-repository'
import { RepositoryProvider } from 'src/main/enum/providers'

import { makeTypeormRepositoryProvider } from './database.provider'

export const makeUsersProvider = (): Provider[] => [
  { provide: UserRepository, useClass: PgUserRepository },
  makeTypeormRepositoryProvider(RepositoryProvider.user, PgUserEntity)
]
