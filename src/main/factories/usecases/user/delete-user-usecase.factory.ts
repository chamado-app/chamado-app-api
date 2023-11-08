import { type Provider } from '@nestjs/common'

import { UserRepository } from '@/domain/repositories'
import { DeleteUserUsecase } from '@/domain/usecases'

export const makeDeleteUserUsecase = (
  repository: UserRepository
): DeleteUserUsecase => new DeleteUserUsecase(repository)

export const makeDeleteUserUsecaseProvider = (): Provider => ({
  provide: DeleteUserUsecase,
  inject: [UserRepository],
  useFactory: makeDeleteUserUsecase
})
