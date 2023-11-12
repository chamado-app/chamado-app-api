import { type Provider } from '@nestjs/common'

import {
  TicketMessageRepository,
  TicketRepository
} from '@/domain/repositories'
import { CreateTicketTextMessageUsecase } from '@/domain/usecases'

export const makeCreateTicketTextMessageUsecase = (
  ticketMessageRepository: TicketMessageRepository,
  ticketRepository: TicketRepository
): CreateTicketTextMessageUsecase =>
  new CreateTicketTextMessageUsecase(ticketMessageRepository, ticketRepository)

export const makeCreateTicketTextMessageUsecaseProvider = (): Provider => ({
  provide: CreateTicketTextMessageUsecase,
  inject: [TicketMessageRepository, TicketRepository],
  useFactory: makeCreateTicketTextMessageUsecase
})
