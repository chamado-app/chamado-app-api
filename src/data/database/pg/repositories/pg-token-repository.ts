import { Inject } from '@nestjs/common'
import { type TokenEntity } from 'src/core/domain/entities/token.entity'
import { type TokenRepository } from 'src/core/repositories/token.repository'
import { RepositoryProvider } from 'src/main/enum/providers'
import { Repository } from 'typeorm'

import { type PgTokenEntity } from '../entities/pg-token.entity'

import { PgRepository } from './pg-repository'

export class PgTokenRepository
  extends PgRepository<TokenEntity>
  implements TokenRepository
{
  constructor(
    @Inject(RepositoryProvider.token)
    repository: Repository<PgTokenEntity>
  ) {
    super(repository)
  }
}
