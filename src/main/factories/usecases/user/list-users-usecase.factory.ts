import { type Provider } from '@nestjs/common'

import { UserRepository } from '@/domain/repositories'
import { ListUsersUsecase } from '@/domain/usecases'

export const makeListUsersUsecase = (
  repository: UserRepository
): ListUsersUsecase => new ListUsersUsecase(repository)

export const makeListUsersUsecaseProvider = (): Provider => ({
  provide: ListUsersUsecase,
  inject: [UserRepository],
  useFactory: makeListUsersUsecase
})
