import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource, type TreeRepository } from 'typeorm'

import { PgRepository } from './pg-repository'

import { PgCategoryEntity } from '@/data/database/pg/entities'
import { type GetManyOptions } from '@/domain/base'
import { type CategoryEntity } from '@/domain/entities'
import { type CategoryRepository } from '@/domain/repositories'

export class PgCategoryRepository
  extends PgRepository<CategoryEntity>
  implements CategoryRepository
{
  protected repository: TreeRepository<CategoryEntity>

  constructor(@InjectDataSource() dataSource: DataSource) {
    super(dataSource.getTreeRepository(PgCategoryEntity))
  }

  async getCountBySlug(slug: string): Promise<number> {
    const table = this.repository.metadata.tableName
    const query = this.repository
      .createQueryBuilder(table)
      .where(`categories.slug ~ '^${slug}(-\\d+)?$'`)

    return await query.getCount()
  }

  async create(data: PgCategoryEntity): Promise<PgCategoryEntity> {
    return await this.repository.save(data)
  }

  async getMany(
    options?: GetManyOptions<CategoryEntity>
  ): Promise<CategoryEntity[]> {
    if (options) return await super.getMany(options)
    return await this.repository.findTrees({ relations: ['parent'] })
  }
}
