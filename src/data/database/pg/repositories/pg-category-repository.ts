import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { PgRepository } from './pg-repository'

import { PgCategoryEntity } from '@/data/database/pg/entities'
import { type CategoryEntity } from '@/domain/entities'
import { type CategoryRepository } from '@/domain/repositories'

export class PgCategoryRepository
  extends PgRepository<CategoryEntity>
  implements CategoryRepository
{
  constructor(
    @InjectRepository(PgCategoryEntity)
    repository: Repository<PgCategoryEntity>
  ) {
    super(repository)
  }
}
