import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { PgEquipmentEntity } from '@/data/database/pg/entities'
import { type EquipmentEntity } from '@/domain/entities'
import { type EquipmentRepository } from '@/domain/repositories'

import { PgRepository } from './pg-repository'

export class PgEquipmentRepository
  extends PgRepository<EquipmentEntity>
  implements EquipmentRepository
{
  constructor(
    @InjectRepository(PgEquipmentEntity)
    repository: Repository<PgEquipmentEntity>
  ) {
    super(repository)
  }
}
