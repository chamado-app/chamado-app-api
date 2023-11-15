import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

import { PgUserEntity } from '@/data/database/pg/entities'
import { type FetchUsersInputDto } from '@/domain/dtos'
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

  async fetchUsers(data: FetchUsersInputDto): Promise<UserEntity[]> {
    const { showRoles: roles } = data

    const users = await this.repository.find({
      order: { firstName: 'ASC', lastName: 'ASC' },
      where: {
        isActive: true,
        roles: { name: roles?.length ? In(roles) : undefined }
      }
    })

    return users
  }
}
