import { type Provider } from '@nestjs/common'

import { authProvider } from './auth.provider'

export const providers: Provider[] = [authProvider]
