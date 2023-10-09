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
  abstract update(id: string, data: T): Promise<T>
  abstract getOne(filter: Partial<T>): Promise<T>
  abstract getMany(options?: GetManyOptions<T>): Promise<T[]>
  abstract delete(filter: Partial<T>, permanent?: boolean): Promise<number>
}
