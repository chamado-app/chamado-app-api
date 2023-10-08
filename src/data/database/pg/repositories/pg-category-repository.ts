import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

import { PgRepository } from './pg-repository'

import { PgCategoryEntity } from '@/data/database/pg/entities'
import { type CategoryEntity } from '@/domain/entities'
import { type CategoryRepository } from '@/domain/repositories'

export class PgCategoryRepository
  extends PgRepository<CategoryEntity>
  implements CategoryRepository
{
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    super(dataSource.getTreeRepository(PgCategoryEntity))
  }

  async getSlugSequence(filter: Partial<CategoryEntity>): Promise<number> {
    const queryBuilder = this.repository
      .createQueryBuilder('categories')
      .where(`categories.slug ~ '^${filter.slug}(-\\d+)?$'`)

    Object.keys(filter)
      .filter((key) => key !== 'slug')
      .forEach((key) =>
        queryBuilder.where(`categories.${key} = :${key}`, {
          [key]: filter[key]
        })
      )

    return await queryBuilder.getCount()
  }

  async create(data: PgCategoryEntity): Promise<PgCategoryEntity> {
    return await this.repository.save(data)
  }

  async getMany(): Promise<CategoryEntity[]> {
    return await this.dataSource
      .getTreeRepository(PgCategoryEntity)
      .findTrees({ relations: ['parent'] })
  }
}
