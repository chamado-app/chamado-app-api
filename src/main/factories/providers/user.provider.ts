import { type Provider } from '@nestjs/common'
import { UserRepository } from 'src/core/repositories/user.repository'
import { PgUserEntity } from 'src/data/database/pg/entities/pg-user.entity'
import { PgUserRepository } from 'src/data/database/pg/repositories/pg-user-repository'
import { RepositoryProvider } from 'src/main/enum/providers'
import { AuthenticateUseCase } from 'src/usecases/authenticate.usecase'

import { makeRepositoryProvider } from './database.provider'

export const makeUsersProvider = (): Provider[] => [
  { provide: UserRepository, useClass: PgUserRepository },
  makeRepositoryProvider(RepositoryProvider.user, PgUserEntity),
  AuthenticateUseCase
]
