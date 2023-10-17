import { type CategoryEntity } from '@/domain/entities'

export class ListCategoriesUsecaseOutputDto {
  constructor(readonly categories: CategoryEntity[], readonly total: number) {}
}
