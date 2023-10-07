export interface Usecase<TModel> {
  execute: (...args: any[]) => Promise<TModel>
}
