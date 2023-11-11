import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

import { PgRoleEntity } from '@/data/database/pg/entities'
import { type Role, type RoleEntity } from '@/domain/entities'
import { type RoleRepository } from '@/domain/repositories'

import { PgRepository } from './pg-repository'

export class PgRoleRepository
  extends PgRepository<RoleEntity>
  implements RoleRepository
{
  constructor(
    @InjectRepository(PgRoleEntity)
    repository: Repository<PgRoleEntity>
  ) {
    super(repository)
  }

  async getManyByName(roles: Role[]): Promise<RoleEntity[]> {
    return await this.repository.find({ where: { name: In(roles) } })
  }
}
