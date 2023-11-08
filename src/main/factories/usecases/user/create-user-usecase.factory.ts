import { type Provider } from '@nestjs/common'

import { HashGenerator } from '@/domain/contracts'
import { RoleRepository, UserRepository } from '@/domain/repositories'
import { CreateUserUsecase } from '@/domain/usecases'

export const makeCreateUserUsecase = (
  userRepository: UserRepository,
  roleRepository: RoleRepository,
  hashGenerator: HashGenerator
): CreateUserUsecase =>
  new CreateUserUsecase(userRepository, roleRepository, hashGenerator)

export const makeCreateUserUsecaseProvider = (): Provider => ({
  provide: CreateUserUsecase,
  inject: [UserRepository, RoleRepository, HashGenerator],
  useFactory: makeCreateUserUsecase
})
