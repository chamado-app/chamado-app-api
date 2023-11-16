import { type Provider } from '@nestjs/common'

import { TicketRepository } from '@/domain/repositories'
import {
  CreateTicketSystemMessageUsecase,
  UpdateTicketStatusUsecase
} from '@/domain/usecases'

export const makeUpdateTicketStatusUsecase = (
  ticketRepository: TicketRepository,
  createTicketSystemMessageUsecase: CreateTicketSystemMessageUsecase
): UpdateTicketStatusUsecase =>
  new UpdateTicketStatusUsecase(
    ticketRepository,
    createTicketSystemMessageUsecase
  )

export const makeUpdateTicketStatusUsecaseProvider = (): Provider => ({
  provide: UpdateTicketStatusUsecase,
  inject: [TicketRepository, CreateTicketSystemMessageUsecase],
  useFactory: makeUpdateTicketStatusUsecase
})
