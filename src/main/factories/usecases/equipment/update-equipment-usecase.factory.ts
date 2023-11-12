import { type Provider } from '@nestjs/common'

import { EquipmentRepository } from '@/domain/repositories'
import { UpdateEquipmentUsecase } from '@/domain/usecases'

export const makeUpdateEquipmentUsecase = (
  equipmentRepository: EquipmentRepository
): UpdateEquipmentUsecase => new UpdateEquipmentUsecase(equipmentRepository)

export const makeUpdateEquipmentUsecaseProvider = (): Provider => ({
  provide: UpdateEquipmentUsecase,
  inject: [EquipmentRepository],
  useFactory: makeUpdateEquipmentUsecase
})
