import { type Provider } from '@nestjs/common'

import {
  CategoryRepository,
  EquipmentRepository,
  TicketRepository
} from '@/domain/repositories'
import { CreateTicketUsecase } from '@/domain/usecases'

export const makeCreateTicketUsecase = (
  ticketRepository: TicketRepository,
  categoryRepository: CategoryRepository,
  equipmentRepository: EquipmentRepository
): CreateTicketUsecase =>
  new CreateTicketUsecase(
    ticketRepository,
    categoryRepository,
    equipmentRepository
  )

export const makeCreateTicketUsecaseProvider = (): Provider => ({
  provide: CreateTicketUsecase,
  inject: [TicketRepository, CategoryRepository, EquipmentRepository],
  useFactory: makeCreateTicketUsecase
})
