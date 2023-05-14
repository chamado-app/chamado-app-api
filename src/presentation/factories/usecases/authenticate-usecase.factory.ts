import { type Provider } from '@nestjs/common'

import { TokenRepository, UserRepository } from '@/domain/repositories'
import { AuthenticateUseCase } from '@/usecases'

export const makeAuthenticateUsecase = (
  userRepository: UserRepository,
  tokenRepository: TokenRepository
): AuthenticateUseCase =>
  new AuthenticateUseCase(userRepository, tokenRepository)

export const makeAuthenticateUsecaseProvider = (): Provider => ({
  provide: AuthenticateUseCase,
  inject: [UserRepository, TokenRepository],
  useFactory: makeAuthenticateUsecase
})
