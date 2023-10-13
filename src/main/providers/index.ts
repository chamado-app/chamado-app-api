import { type Provider } from '@nestjs/common'

import { authProvider } from './auth.provider'

import { makeJwtVerifierFactory } from '@/main/factories/adapters'
import { makeUserRepository } from '@/main/factories/repositories'

export const providers: Provider[] = [
  authProvider,
  makeUserRepository(),
  makeJwtVerifierFactory()
]
