import { type Provider } from '@nestjs/common'

import { CategoryRepository } from '@/domain/repositories'
import { FetchCategoriesUsecase } from '@/domain/usecases'

export const makeFetchCategoriesUsecase = (
  repository: CategoryRepository
): FetchCategoriesUsecase => new FetchCategoriesUsecase(repository)

export const makeFetchCategoriesUsecaseProvider = (): Provider => ({
  provide: FetchCategoriesUsecase,
  inject: [CategoryRepository],
  useFactory: makeFetchCategoriesUsecase
})
