import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { PgRepository } from './pg-repository'

import { PgTokenEntity } from '@/data/database/pg/entities'
import { type TokenEntity } from '@/domain/entities'
import { type TokenRepository } from '@/domain/repositories'

export class PgTokenRepository
  extends PgRepository<TokenEntity>
  implements TokenRepository
{
  constructor(
    @InjectRepository(PgTokenEntity)
    repository: Repository<PgTokenEntity>
  ) {
    super(repository)
  }
}
