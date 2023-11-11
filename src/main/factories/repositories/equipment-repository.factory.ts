import { type Provider } from '@nestjs/common'

import { PgEquipmentRepository } from '@/data/database/pg/repositories'
import { EquipmentRepository } from '@/domain/repositories'

export const makeEquipmentRepository = (): Provider => ({
  provide: EquipmentRepository,
  useClass: PgEquipmentRepository
})
