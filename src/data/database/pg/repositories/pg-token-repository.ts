import { Inject } from '@nestjs/common'
import { Repository } from 'typeorm'

import { PgRepository } from './pg-repository'

import { type PgTokenEntity } from '@/data/database/pg/entities'
import { RepositoryProvider } from '@/data/enum'
import { type TokenEntity } from '@/domain/entities'
import { type TokenRepository } from '@/domain/repositories'

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
