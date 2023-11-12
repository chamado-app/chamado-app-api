import { type Provider } from '@nestjs/common'

import { EquipmentRepository } from '@/domain/repositories'
import { FetchEquipmentsUsecase } from '@/domain/usecases'

export const makeFetchEquipmentsUsecase = (
  repository: EquipmentRepository
): FetchEquipmentsUsecase => new FetchEquipmentsUsecase(repository)

export const makeFetchEquipmentsUsecaseProvider = (): Provider => ({
  provide: FetchEquipmentsUsecase,
  inject: [EquipmentRepository],
  useFactory: makeFetchEquipmentsUsecase
})
