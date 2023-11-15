import { type Provider } from '@nestjs/common'

import { TokenRepository } from '@/domain/repositories'
import { LogoutUsecase } from '@/domain/usecases'

export const makeLogoutUsecase = (
  tokenRepository: TokenRepository
): LogoutUsecase => new LogoutUsecase(tokenRepository)

export const makeLogoutUsecaseProvider = (): Provider => ({
  provide: LogoutUsecase,
  inject: [TokenRepository],
  useFactory: makeLogoutUsecase
})
