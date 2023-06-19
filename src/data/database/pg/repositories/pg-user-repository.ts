import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { PgRepository } from './pg-repository'

import { PgUserEntity } from '@/data/database/pg/entities'
import { type UserEntity } from '@/domain/entities'
import { type UserRepository } from '@/domain/repositories'

export class PgUserRepository
  extends PgRepository<UserEntity>
  implements UserRepository
{
  constructor(
    @InjectRepository(PgUserEntity)
    repository: Repository<PgUserEntity>
  ) {
    super(repository)
  }
}
