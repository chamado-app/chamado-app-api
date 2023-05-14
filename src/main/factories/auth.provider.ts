import { type Provider } from '@nestjs/common'

import { makeTypeormRepositoryProvider } from './database.provider'

import { PgTokenEntity } from '@/data/database/pg/entities'
import { PgTokenRepository } from '@/data/database/pg/repositories'
import { RepositoryProvider } from '@/data/enum'
import { TokenRepository } from '@/domain/repositories'
import { AuthenticateUseCase } from '@/usecases'

export const makeAuthProvider = (): Provider[] => [
  { provide: TokenRepository, useClass: PgTokenRepository },
  makeTypeormRepositoryProvider(RepositoryProvider.token, PgTokenEntity),
  AuthenticateUseCase
]
