import { Inject } from '@nestjs/common'
import { Repository } from 'typeorm'

import { PgRepository } from './pg-repository'

import { type PgUserEntity } from '@/data/database/pg/entities'
import { RepositoryProvider } from '@/data/enum'
import { type UserEntity } from '@/domain/entities'
import { type UserRepository } from '@/domain/repositories'

export class PgUserRepository
  extends PgRepository<UserEntity>
  implements UserRepository
{
  constructor(
    @Inject(RepositoryProvider.user)
    repository: Repository<PgUserEntity>
  ) {
    super(repository)
  }
}
