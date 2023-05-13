import { Inject } from '@nestjs/common'
import { type UserEntity } from 'src/core/domain/entities/user.entity'
import { type UserRepository } from 'src/core/repositories/user.repository'
import { RepositoryProvider } from 'src/main/enum/providers'
import { Repository } from 'typeorm'

import { type PgUserEntity } from '../entities/pg-user.entity'

import { PgRepository } from './pg-repository'

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
