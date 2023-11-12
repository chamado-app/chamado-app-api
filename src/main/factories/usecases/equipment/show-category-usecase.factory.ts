import { type Provider } from '@nestjs/common'

import { EquipmentRepository } from '@/domain/repositories'
import { ShowEquipmentUsecase } from '@/domain/usecases'

export const makeShowEquipmentUsecase = (
  repository: EquipmentRepository
): ShowEquipmentUsecase => new ShowEquipmentUsecase(repository)

export const makeShowEquipmentUsecaseProvider = (): Provider => ({
  provide: ShowEquipmentUsecase,
  inject: [EquipmentRepository],
  useFactory: makeShowEquipmentUsecase
})
