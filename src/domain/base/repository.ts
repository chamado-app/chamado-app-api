import { type Entity } from './entity'

export interface GetOneOptions<T> {
  filter: Partial<T>
  withDeleted?: boolean
}

export interface GetManyOptions<T> {
  search?: { value: string; fields: Array<keyof T> }
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
  abstract create(data: Partial<T>): Promise<T>
  abstract update(id: string, data: Partial<T>): Promise<T>
  abstract getOne(options: GetOneOptions<T>): Promise<T | null>
  abstract getMany(options?: GetManyOptions<T>): Promise<GetManyResult<T>>
  abstract delete(filter: Partial<T>, permanent?: boolean): Promise<number>
}
