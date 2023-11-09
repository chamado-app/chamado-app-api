import { type Provider } from '@nestjs/common'

import { UserRepository } from '@/domain/repositories'
import { ShowUserUsecase } from '@/domain/usecases'

export const makeShowUserUsecase = (
  repository: UserRepository
): ShowUserUsecase => new ShowUserUsecase(repository)

export const makeShowUserUsecaseProvider = (): Provider => ({
  provide: ShowUserUsecase,
  inject: [UserRepository],
  useFactory: makeShowUserUsecase
})
