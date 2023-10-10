import { type Provider } from '@nestjs/common'

import { CategoryRepository } from '@/domain/repositories'
import { ListCategoriesUsecase } from '@/domain/usecases'

export const makeListCategoriesUsecase = (
  repository: CategoryRepository
): ListCategoriesUsecase => new ListCategoriesUsecase(repository)

export const makeListCategoriesUsecaseProvider = (): Provider => ({
  provide: ListCategoriesUsecase,
  inject: [CategoryRepository],
  useFactory: makeListCategoriesUsecase
})
