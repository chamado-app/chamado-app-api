import { type Provider } from '@nestjs/common'

import { HashComparer } from '@/domain/contracts'
import { TokenRepository, UserRepository } from '@/domain/repositories'
import { AuthenticateUsecase } from '@/usecases'

export const makeAuthenticateUsecase = (
  userRepository: UserRepository,
  tokenRepository: TokenRepository,
  hashCompare: HashComparer
): AuthenticateUsecase =>
  new AuthenticateUsecase(userRepository, tokenRepository, hashCompare)

export const makeAuthenticateUsecaseProvider = (): Provider => ({
  provide: AuthenticateUsecase,
  inject: [UserRepository, TokenRepository, HashComparer],
  useFactory: makeAuthenticateUsecase
})
