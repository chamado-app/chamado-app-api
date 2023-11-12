import { type Provider } from '@nestjs/common'

import { TicketRepository } from '@/domain/repositories'
import { ListTicketsUsecase } from '@/domain/usecases'

export const makeListTicketsUsecase = (
  repository: TicketRepository
): ListTicketsUsecase => new ListTicketsUsecase(repository)

export const makeListTicketsUsecaseProvider = (): Provider => ({
  provide: ListTicketsUsecase,
  inject: [TicketRepository],
  useFactory: makeListTicketsUsecase
})
