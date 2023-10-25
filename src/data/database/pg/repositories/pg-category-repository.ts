import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { PgCategoryEntity } from '@/data/database/pg/entities'
import { type CategoryEntity } from '@/domain/entities'
import { type CategoryRepository } from '@/domain/repositories'

import { PgRepository } from './pg-repository'

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

  async getCountBySlug(slug: string, id?: string): Promise<number> {
    const table = this.repository.metadata.tableName
    const query = this.repository
      .createQueryBuilder(table)
      .withDeleted()
      .where(`categories.slug ~ '^${slug}(-\\d+)?$'`)

    if (id) query.andWhere('categories.id <> :id', { id })

    return await query.getCount()
  }
}
