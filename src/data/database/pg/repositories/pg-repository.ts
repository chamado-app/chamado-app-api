import { Injectable } from '@nestjs/common'
import {
  type FindOptionsWhere,
  ILike,
  Repository as TypeOrmRepository
} from 'typeorm'

import {
  type Entity,
  type GetManyOptions,
  type GetManyResult,
  Repository
} from '@/domain/base'

@Injectable()
export class PgRepository<T extends Entity> extends Repository<T> {
  protected readonly repository: TypeOrmRepository<T>

  constructor(repository: TypeOrmRepository<T>) {
    super()
    this.repository = repository
  }

  async create(data: T): Promise<T> {
    return await this.repository.save(data)
  }

  async update(id: string, data: T): Promise<T> {
    return await this.repository.save({ ...data, id })
  }

  async getOne(filter: Partial<T>): Promise<T | null> {
    const where = filter as FindOptionsWhere<T>
    return await this.repository.findOne({ where })
  }

  async getMany(options: GetManyOptions<T> = {}): Promise<GetManyResult<T>> {
    const { fields, filter = {}, orderBy, take, skip, search } = options

    const query = this.repository.createQueryBuilder(
      this.repository.metadata.tableName
    )

    if (fields) query.select(fields as string[])
    if (take) query.take(take)
    if (skip) query.skip(skip)

    if (orderBy) {
      Object.keys(orderBy).forEach((key, index) => {
        const direction = orderBy[key] as 'ASC' | 'DESC'
        if (index === 0) query.orderBy(key, direction)
        else query.addOrderBy(key, direction)
      })
    }

    if (search) {
      const iLikeSearch = ILike(`%${search.value}%`)

      search.fields.forEach((field, index) => {
        if (index === 0) query.where({ [field]: iLikeSearch })
        else query.orWhere({ [field]: iLikeSearch })
      })

      query.andWhere(filter)
    } else {
      query.where(filter)
    }

    const [items, total] = await query.getManyAndCount()
    return { items, total }
  }

  async delete(filter: Partial<T>, permanent?: boolean): Promise<number> {
    const where = filter as FindOptionsWhere<T>
    let affected = 0

    if (permanent) {
      const deleteResult = await this.repository.delete(where)
      affected = deleteResult.affected ?? 0
    } else {
      const softDeleteResult = await this.repository.softDelete(where)
      affected = softDeleteResult.affected ?? 0
    }

    return affected
  }
}
