import { type Entity } from './entity'

export interface GetManyOptions<T> {
  filter?: Partial<T>
  fields?: Array<keyof T>
  orderBy?: { [K in keyof T]?: 'ASC' | 'DESC' }
  take?: number
  skip?: number
}

export interface GetManyResult<T> {
  items: T[]
  total: number
}

export abstract class Repository<T extends Entity> {
  abstract create(data: T): Promise<T>
  abstract update(id: string, data: T): Promise<T>
  abstract getOne(filter: Partial<T>): Promise<T>
  abstract getMany(options?: GetManyOptions<T>): Promise<GetManyResult<T>>
  abstract delete(filter: Partial<T>, permanent?: boolean): Promise<number>
}
