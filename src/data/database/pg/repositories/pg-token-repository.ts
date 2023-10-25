import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { PgTokenEntity } from '@/data/database/pg/entities'
import { type TokenEntity } from '@/domain/entities'
import { type TokenRepository } from '@/domain/repositories'

import { PgRepository } from './pg-repository'

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
