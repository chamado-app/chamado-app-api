import { type Provider } from '@nestjs/common'

import { CategoryRepository } from '@/domain/repositories'
import { ShowCategoryUsecase } from '@/domain/usecases'

export const makeShowCategoryUsecase = (
  repository: CategoryRepository
): ShowCategoryUsecase => new ShowCategoryUsecase(repository)

export const makeShowCategoryUsecaseProvider = (): Provider => ({
  provide: ShowCategoryUsecase,
  inject: [CategoryRepository],
  useFactory: makeShowCategoryUsecase
})
