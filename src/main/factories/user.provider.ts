import { type Provider } from '@nestjs/common'

import { makeTypeormRepositoryProvider } from './database.provider'

import { PgUserEntity } from '@/data/database/pg/entities'
import { PgUserRepository } from '@/data/database/pg/repositories'
import { RepositoryProvider } from '@/data/enum'
import { UserRepository } from '@/domain/repositories'

export const makeUsersProvider = (): Provider[] => [
  { provide: UserRepository, useClass: PgUserRepository },
  makeTypeormRepositoryProvider(RepositoryProvider.user, PgUserEntity)
]
