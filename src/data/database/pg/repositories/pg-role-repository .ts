import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { PgRepository } from './pg-repository'

import { PgRoleEntity } from '@/data/database/pg/entities'
import { type RoleEntity } from '@/domain/entities'
import { type RoleRepository } from '@/domain/repositories'

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
}
