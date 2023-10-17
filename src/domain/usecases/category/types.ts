import { type CategoryEntity } from '@/domain/entities'

export type ListCategoriesUsecaseInputDto = {
  take?: number
  skip?: number
}

export type ListCategoriesUsecaseOutputDto = {
  categories: CategoryEntity[]
  total: number
}
