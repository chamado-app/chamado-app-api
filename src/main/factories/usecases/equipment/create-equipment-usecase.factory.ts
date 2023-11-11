import { type Provider } from '@nestjs/common'

import { EquipmentRepository } from '@/domain/repositories'
import { CreateEquipmentUsecase } from '@/domain/usecases'

export const makeCreateEquipmentUsecase = (
  equipmentRepository: EquipmentRepository
): CreateEquipmentUsecase => new CreateEquipmentUsecase(equipmentRepository)

export const makeCreateEquipmentUsecaseProvider = (): Provider => ({
  provide: CreateEquipmentUsecase,
  inject: [EquipmentRepository],
  useFactory: makeCreateEquipmentUsecase
})
