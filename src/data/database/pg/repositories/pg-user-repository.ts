import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { PgUserEntity } from '@/data/database/pg/entities'
import { type UserEntity } from '@/domain/entities'
import { type UserRepository } from '@/domain/repositories'

import { PgRepository } from './pg-repository'

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

  async getByIdWithAuthorization(
    id: UserEntity['id']
  ): Promise<UserEntity | null> {
    return this.repository.findOne({
      where: { id, isActive: true },
      relations: { roles: true, tokens: true }
    })
  }
}
