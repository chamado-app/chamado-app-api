import { type Provider } from '@nestjs/common'

import { makeJwtVerifierFactory } from '@/main/factories/adapters'
import { makeUserRepository } from '@/main/factories/repositories'

import { authProvider } from './auth.provider'

export const providers: Provider[] = [
  authProvider,
  makeUserRepository(),
  makeJwtVerifierFactory()
]
