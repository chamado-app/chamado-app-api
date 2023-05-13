import { type Provider } from '@nestjs/common'
import { TokenRepository } from 'src/core/repositories/token.repository'
import { PgTokenEntity } from 'src/data/database/pg/entities/pg-token.entity'
import { PgTokenRepository } from 'src/data/database/pg/repositories/pg-token-repository'
import { RepositoryProvider } from 'src/main/enum/providers'
import { AuthenticateUseCase } from 'src/usecases/authenticate.usecase'

import { makeTypeormRepositoryProvider } from './database.provider'

export const makeAuthProvider = (): Provider[] => [
  { provide: TokenRepository, useClass: PgTokenRepository },
  makeTypeormRepositoryProvider(RepositoryProvider.token, PgTokenEntity),
  AuthenticateUseCase
]
