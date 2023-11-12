import { type Provider } from '@nestjs/common'

import { EquipmentRepository } from '@/domain/repositories'
import { ListEquipmentsUsecase } from '@/domain/usecases'

export const makeListEquipmentsUsecase = (
  repository: EquipmentRepository
): ListEquipmentsUsecase => new ListEquipmentsUsecase(repository)

export const makeListEquipmentsUsecaseProvider = (): Provider => ({
  provide: ListEquipmentsUsecase,
  inject: [EquipmentRepository],
  useFactory: makeListEquipmentsUsecase
})
