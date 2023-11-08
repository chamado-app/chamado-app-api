import { type Provider } from '@nestjs/common'

import { HashGenerator } from '@/domain/contracts'
import { RoleRepository, UserRepository } from '@/domain/repositories'
import { UpdateUserUsecase } from '@/domain/usecases'

export const makeUpdateUserUsecase = (
  userRepository: UserRepository,
  roleRepository: RoleRepository,
  hashGenerator: HashGenerator
): UpdateUserUsecase =>
  new UpdateUserUsecase(userRepository, roleRepository, hashGenerator)

export const makeUpdateUserUsecaseProvider = (): Provider => ({
  provide: UpdateUserUsecase,
  inject: [UserRepository, RoleRepository, HashGenerator],
  useFactory: makeUpdateUserUsecase
})
