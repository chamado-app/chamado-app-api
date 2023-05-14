import { type Provider } from '@nestjs/common'

import { HashComparer } from '@/domain/contracts'
import { TokenRepository, UserRepository } from '@/domain/repositories'
import { AuthenticateUseCase } from '@/usecases'

export const makeAuthenticateUsecase = (
  userRepository: UserRepository,
  tokenRepository: TokenRepository,
  hashCompare: HashComparer
): AuthenticateUseCase =>
  new AuthenticateUseCase(userRepository, tokenRepository, hashCompare)

export const makeAuthenticateUsecaseProvider = (): Provider => ({
  provide: AuthenticateUseCase,
  inject: [UserRepository, TokenRepository, HashComparer],
  useFactory: makeAuthenticateUsecase
})
