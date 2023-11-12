import { type Provider } from '@nestjs/common'

import { TicketRepository } from '@/domain/repositories'
import { UpdateTicketStatusUsecase } from '@/domain/usecases'

export const makeUpdateTicketStatusUsecase = (
  ticketRepository: TicketRepository
): UpdateTicketStatusUsecase => new UpdateTicketStatusUsecase(ticketRepository)

export const makeUpdateTicketStatusUsecaseProvider = (): Provider => ({
  provide: UpdateTicketStatusUsecase,
  inject: [TicketRepository],
  useFactory: makeUpdateTicketStatusUsecase
})
