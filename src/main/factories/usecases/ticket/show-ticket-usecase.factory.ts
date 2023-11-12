import { type Provider } from '@nestjs/common'

import { TicketRepository } from '@/domain/repositories'
import { ShowTicketUsecase } from '@/domain/usecases'

export const makeShowTicketUsecase = (
  ticketRepository: TicketRepository
): ShowTicketUsecase => new ShowTicketUsecase(ticketRepository)

export const makeShowTicketUsecaseProvider = (): Provider => ({
  provide: ShowTicketUsecase,
  inject: [TicketRepository],
  useFactory: makeShowTicketUsecase
})
