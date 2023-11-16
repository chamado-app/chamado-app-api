import { type Provider } from '@nestjs/common'

import { TicketRepository, UserRepository } from '@/domain/repositories'
import {
  CreateTicketSystemMessageUsecase,
  UpdateTicketAssignedUsecase
} from '@/domain/usecases'

export const makeUpdateTicketAssignedUsecase = (
  ticketRepository: TicketRepository,
  userRepository: UserRepository,
  createTicketSystemMessageUsecase: CreateTicketSystemMessageUsecase
): UpdateTicketAssignedUsecase =>
  new UpdateTicketAssignedUsecase(
    ticketRepository,
    userRepository,
    createTicketSystemMessageUsecase
  )

export const makeUpdateTicketAssignedUsecaseProvider = (): Provider => ({
  provide: UpdateTicketAssignedUsecase,
  inject: [TicketRepository, UserRepository, CreateTicketSystemMessageUsecase],
  useFactory: makeUpdateTicketAssignedUsecase
})
