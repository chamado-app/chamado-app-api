import { type Observable } from 'rxjs'

export interface Usecase<TModel> {
  execute: (...args: any[]) => Observable<TModel>
}
