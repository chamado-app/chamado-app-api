import { type Provider } from '@nestjs/common'

import { CategoryRepository } from '@/domain/repositories'
import { DeleteCategoryUsecase } from '@/domain/usecases'

export const makeDeleteCategoryUsecase = (
  repository: CategoryRepository
): DeleteCategoryUsecase => new DeleteCategoryUsecase(repository)

export const makeDeleteCategoryUsecaseProvider = (): Provider => ({
  provide: DeleteCategoryUsecase,
  inject: [CategoryRepository],
  useFactory: makeDeleteCategoryUsecase
})
