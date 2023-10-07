import { type Provider } from '@nestjs/common'

import { Slugifier } from '@/domain/contracts'
import { CategoryRepository } from '@/domain/repositories'
import { CreateCategoryUsecase } from '@/usecases'

export const makeCreateCategoryUsecase = (
  repository: CategoryRepository,
  slugify: Slugifier
): CreateCategoryUsecase => new CreateCategoryUsecase(repository, slugify)

export const makeCreateCategoryUsecaseProvider = (): Provider => ({
  provide: CreateCategoryUsecase,
  inject: [CategoryRepository, Slugifier],
  useFactory: makeCreateCategoryUsecase
})
