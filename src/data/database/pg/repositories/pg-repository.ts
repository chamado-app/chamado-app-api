import { Injectable } from '@nestjs/common'
import { type Observable, from } from 'rxjs'
import { type FindOptionsWhere, Repository as TypeOrmRepository } from 'typeorm'

import { type Entity, Repository } from '@/domain/base'

@Injectable()
export class PgRepository<T extends Entity> extends Repository<T> {
  private readonly repository: TypeOrmRepository<T>

  constructor(repository: TypeOrmRepository<T>) {
    super()
    this.repository = repository
  }

  public create(data: T): Observable<T> {
    const promise = this.repository.save(data)
    return from(promise)
  }

  getOne(filter: Partial<T>): Observable<T> {
    const where = filter as FindOptionsWhere<T>
    const promise = this.repository.findOne({ where })
    return from(promise)
  }
}
