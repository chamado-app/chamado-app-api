import { type Provider } from '@nestjs/common'

import { EquipmentRepository } from '@/domain/repositories'
import { DeleteEquipmentUsecase } from '@/domain/usecases'

export const makeDeleteEquipmentUsecase = (
  repository: EquipmentRepository
): DeleteEquipmentUsecase => new DeleteEquipmentUsecase(repository)

export const makeDeleteEquipmentUsecaseProvider = (): Provider => ({
  provide: DeleteEquipmentUsecase,
  inject: [EquipmentRepository],
  useFactory: makeDeleteEquipmentUsecase
})
