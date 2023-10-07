import { type Observable } from 'rxjs'

import { type Entity } from './entity'

export abstract class Repository<T extends Entity> {
  abstract create(data: T): Observable<T>
  // abstract update(id: number, data: T): Observable<T>
  // abstract patch(id: number, data: Partial<T>): Observable<T>
  // abstract getById(id: number): Observable<T>
  // abstract getAll(): Observable<T[]>
  abstract getOne(filter: Partial<T>): Observable<T>
  abstract getMany(filter: Partial<T>): Observable<T[]>
  abstract delete(filter: Partial<T>): Observable<number>
}
