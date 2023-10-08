import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { PgRepository } from './pg-repository'

import { PgCategoryEntity } from '@/data/database/pg/entities'
import { type GetManyOptions } from '@/domain/base'
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

  async getMany(
    options?: GetManyOptions<CategoryEntity>
  ): Promise<CategoryEntity[]> {
    return await super.getMany(options)
  }
}
