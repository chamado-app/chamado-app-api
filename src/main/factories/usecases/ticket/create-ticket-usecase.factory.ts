import { type Provider } from '@nestjs/common'

import {
  CategoryRepository,
  EquipmentRepository,
  TicketRepository
} from '@/domain/repositories'
import {
  CreateTicketTextMessageUsecase,
  CreateTicketUsecase
} from '@/domain/usecases'

export const makeCreateTicketUsecase = (
  ticketRepository: TicketRepository,
  categoryRepository: CategoryRepository,
  equipmentRepository: EquipmentRepository,
  createTicketTextMessageUsecase: CreateTicketTextMessageUsecase
): CreateTicketUsecase =>
  new CreateTicketUsecase(
    ticketRepository,
    categoryRepository,
    equipmentRepository,
    createTicketTextMessageUsecase
  )

export const makeCreateTicketUsecaseProvider = (): Provider => ({
  provide: CreateTicketUsecase,
  inject: [
    TicketRepository,
    CategoryRepository,
    EquipmentRepository,
    CreateTicketTextMessageUsecase
  ],
  useFactory: makeCreateTicketUsecase
})
