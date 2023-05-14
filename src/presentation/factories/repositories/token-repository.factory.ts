import { type Provider } from '@nestjs/common'

import { PgTokenRepository } from '@/data/database/pg/repositories'
import { TokenRepository } from '@/domain/repositories'

export const makeTokenRepository = (): Provider => ({
  provide: TokenRepository,
  useClass: PgTokenRepository
})
