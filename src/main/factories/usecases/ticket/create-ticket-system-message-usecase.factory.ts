import { type Provider } from '@nestjs/common'

import {
  TicketMessageRepository,
  TicketRepository
} from '@/domain/repositories'
import { CreateTicketSystemMessageUsecase } from '@/domain/usecases'

export const makeCreateTicketSystemMessageUsecase = (
  ticketMessageRepository: TicketMessageRepository,
  ticketRepository: TicketRepository
): CreateTicketSystemMessageUsecase =>
  new CreateTicketSystemMessageUsecase(
    ticketMessageRepository,
    ticketRepository
  )

export const makeCreateTicketSystemMessageUsecaseProvider = (): Provider => ({
  provide: CreateTicketSystemMessageUsecase,
  inject: [TicketMessageRepository, TicketRepository],
  useFactory: makeCreateTicketSystemMessageUsecase
})
