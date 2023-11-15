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
  Repository,
  type GetOneOptions
} from '@/domain/base'
import { type DeepPartial } from '@/domain/types'
import { camelToSnakeCase } from '@/shared/utils'

const VALIDATE_UUID_REGEXP =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi

@Injectable()
export class PgRepository<T extends Entity> extends Repository<T> {
  protected readonly repository: TypeOrmRepository<T>

  constructor(repository: TypeOrmRepository<T>) {
    super()
    this.repository = repository
  }

  async create(data: T): Promise<T> {
    return await this.repository.save(data, { reload: true })
  }

  async update(id: string, data: T): Promise<T> {
    return await this.repository.save({ ...data, id })
  }

  async getOne(options: GetOneOptions<T>): Promise<T | null> {
    const { filter, relations, withDeleted = false } = options
    const where = filter as FindOptionsWhere<T>
    return await this.repository.findOne({ where, withDeleted, relations })
  }

  async getMany(options: GetManyOptions<T> = {}): Promise<GetManyResult<T>> {
    const { fields, filter = {}, orderBy, take, skip, search } = options

    const query = this.repository.createQueryBuilder(
      this.repository.metadata.tableName
    )

    if (fields) query.select(this.getTableFields(fields))
    if (take) query.take(take)
    if (skip) query.skip(skip)

    if (orderBy) {
      Object.keys(orderBy).forEach((key, index) => {
        const snakeCaseKey = camelToSnakeCase(key)
        const direction = orderBy[snakeCaseKey] as 'ASC' | 'DESC'
        if (index === 0) query.orderBy(snakeCaseKey, direction)
        else query.addOrderBy(snakeCaseKey, direction)
      })
    }

    if (search) {
      const iLikeSearch = ILike(`%${search.value}%`)
      const searchFielsWithoutId = search.fields.filter(
        (field) => field !== 'id'
      )

      searchFielsWithoutId.forEach((field, index) => {
        const where = { [field]: iLikeSearch }
        if (index === 0) query.where(where)
        else query.orWhere(where)
      })

      if (search.fields.includes('id')) {
        const isValidateUuid = VALIDATE_UUID_REGEXP.test(search.value)

        if (isValidateUuid) {
          const where = { id: search.value }
          if (searchFielsWithoutId.length > 0) query.orWhere(where)
          else query.where(where)
        }
      }

      query.andWhere(filter)
    } else {
      query.where(filter)
    }

    const [items, total] = await query.getManyAndCount()
    return { items, total }
  }

  private getTableFields(fields: Array<keyof T & string>): string[] {
    const tableName = this.repository.metadata.tableName
    return fields.map((field) => {
      const snakedField = camelToSnakeCase(field)
      return `${tableName}.${snakedField}`
    })
  }

  async delete(filter: DeepPartial<T>, permanent?: boolean): Promise<number> {
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
