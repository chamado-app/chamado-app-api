import { Injectable } from '@nestjs/common'
import { type FindOptionsWhere, Repository as TypeOrmRepository } from 'typeorm'

import { type Entity, type GetManyOptions, Repository } from '@/domain/base'

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

  async getOne(filter: Partial<T>): Promise<T> {
    const where = filter as FindOptionsWhere<T>
    return await this.repository.findOne({ where })
  }

  async getMany(options?: GetManyOptions<T>): Promise<T[]> {
    const where = options.filter as FindOptionsWhere<T>
    return await this.repository.find({ where })
  }

  async delete(filter: Partial<T>, permanent?: boolean): Promise<number> {
    const where = filter as FindOptionsWhere<T>
    let affected = 0

    if (permanent) {
      const deleteResult = await this.repository.delete(where)
      affected = deleteResult.affected
    } else {
      const softDeleteResult = await this.repository.softDelete(where)
      affected = softDeleteResult.affected
    }

    return affected
  }
}
