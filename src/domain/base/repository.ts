import { type Entity } from './entity'

export abstract class Repository<T extends Entity> {
  abstract create(data: T): Promise<T>
  // abstract update(id: number, data: T): Promise<T>
  // abstract patch(id: number, data: Partial<T>): Promise<T>
  // abstract getById(id: number): Promise<T>
  // abstract getAll(): Promise<T[]>
  abstract getOne(filter: Partial<T>): Promise<T>
  abstract getMany(filter: Partial<T>): Promise<T[]>
  abstract delete(filter: Partial<T>): Promise<number>
}
