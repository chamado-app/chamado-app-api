import { type Provider } from '@nestjs/common'

import { HashComparer, JwtGenerator } from '@/domain/contracts'
import { TokenRepository, UserRepository } from '@/domain/repositories'
import { AuthenticateUsecase } from '@/usecases'

export const makeAuthenticateUsecase = (
  userRepository: UserRepository,
  tokenRepository: TokenRepository,
  hashCompare: HashComparer,
  jwtGenerator: JwtGenerator
): AuthenticateUsecase =>
  new AuthenticateUsecase(
    userRepository,
    tokenRepository,
    hashCompare,
    jwtGenerator
  )

export const makeAuthenticateUsecaseProvider = (): Provider => ({
  provide: AuthenticateUsecase,
  inject: [UserRepository, TokenRepository, HashComparer, JwtGenerator],
  useFactory: makeAuthenticateUsecase
})
