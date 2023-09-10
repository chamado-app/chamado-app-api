import { type Provider } from '@nestjs/common'

import { CategoryRepository } from '@/domain/repositories'
import { CreateCategoryUsecase } from '@/usecases'

export const makeCreateCategoryUsecase = (
  repository: CategoryRepository
): CreateCategoryUsecase => new CreateCategoryUsecase(repository)

export const makeCreateCategoryUsecaseProvider = (): Provider => ({
  provide: CreateCategoryUsecase,
  inject: [CategoryRepository],
  useFactory: makeCreateCategoryUsecase
})
