import { type Provider } from '@nestjs/common'

import { PgRoleRepository } from '@/data/database/pg/repositories'
import { RoleRepository } from '@/domain/repositories'

export const makeRoleRepository = (): Provider => ({
  provide: RoleRepository,
  useClass: PgRoleRepository
})
