import { type Provider } from '@nestjs/common'

import { PgUserRepository } from '@/data/database/pg/repositories'
import { UserRepository } from '@/domain/repositories'

export const makeUserRepository = (): Provider => ({
  provide: UserRepository,
  useClass: PgUserRepository
})
