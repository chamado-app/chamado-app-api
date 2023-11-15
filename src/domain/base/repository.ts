import { type DeepPartial } from '../types'
import { type Entity } from './entity'

export interface GetOneOptions<T> {
  filter: DeepPartial<T>
  relations?: Array<keyof T & string>
  withDeleted?: boolean
}

export interface GetManyOptions<T> {
  search?: { value: string; fields: Array<keyof T & string> }
  filter?: DeepPartial<T>
  fields?: Array<keyof T & string>
  orderBy?: { [K in keyof T]?: 'ASC' | 'DESC' }
  take?: number
  skip?: number
}

export interface GetManyResult<T> {
  items: T[]
  total: number
}

export abstract class Repository<T extends Entity> {
  abstract create(data: Partial<T>): Promise<T>
  abstract update(id: string, data: Partial<T>): Promise<T>
  abstract getOne(options: GetOneOptions<T>): Promise<T | null>
  abstract getMany(options?: GetManyOptions<T>): Promise<GetManyResult<T>>
  abstract delete(filter: DeepPartial<T>, permanent?: boolean): Promise<number>
}
