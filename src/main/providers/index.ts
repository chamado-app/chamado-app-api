import { type Provider } from '@nestjs/common'

import { makeUserRepository } from '../factories/repositories/user-repository.factory'

import { authProvider } from './auth.provider'

export const providers: Provider[] = [authProvider, makeUserRepository()]
