import { type Provider } from '@nestjs/common'

import { Slugifier } from '@/domain/contracts'
import { CategoryRepository } from '@/domain/repositories'
import { UpdateCategoryUsecase } from '@/domain/usecases'

export const makeUpdateCategoryUsecase = (
  repository: CategoryRepository,
  slugify: Slugifier
): UpdateCategoryUsecase => new UpdateCategoryUsecase(repository, slugify)

export const makeUpdateCategoryUsecaseProvider = (): Provider => ({
  provide: UpdateCategoryUsecase,
  inject: [CategoryRepository, Slugifier],
  useFactory: makeUpdateCategoryUsecase
})
