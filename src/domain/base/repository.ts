import { type Entity } from './entity'

export interface GetManyOptions<T> {
  filter?: Partial<T>
  fields?: Array<keyof T>
  orderBy?: { [x in keyof T]?: 'ASC' | 'DESC' }
  take?: number
  skip?: number
}

export abstract class Repository<T extends Entity> {
  abstract create(data: T): Promise<T>
  // abstract update(id: number, data: T): Promise<T>
  // abstract patch(id: number, data: Partial<T>): Promise<T>
  // abstract getById(id: number): Promise<T>
  // abstract getAll(): Promise<T[]>
  abstract getOne(filter: Partial<T>): Promise<T>
  abstract getMany(options?: GetManyOptions<T>): Promise<T[]>
  abstract delete(filter: Partial<T>): Promise<number>
}
