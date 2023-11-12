import { type Provider } from '@nestjs/common'

import { UserRepository } from '@/domain/repositories'
import { FetchUsersUsecase } from '@/domain/usecases'

export const makeFetchUsersUsecase = (
  repository: UserRepository
): FetchUsersUsecase => new FetchUsersUsecase(repository)

export const makeFetchUsersUsecaseProvider = (): Provider => ({
  provide: FetchUsersUsecase,
  inject: [UserRepository],
  useFactory: makeFetchUsersUsecase
})
