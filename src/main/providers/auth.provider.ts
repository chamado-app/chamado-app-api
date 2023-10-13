import { type Provider } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

import { AuthGuard } from '@/infra'

export const authProvider: Provider = {
  provide: APP_GUARD,
  useClass: AuthGuard
}
