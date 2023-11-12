import { type Provider } from '@nestjs/common'

import { TicketRepository, UserRepository } from '@/domain/repositories'
import { UpdateTicketAssignedUsecase } from '@/domain/usecases'

export const makeUpdateTicketAssignedUsecase = (
  ticketRepository: TicketRepository,
  userRepository: UserRepository
): UpdateTicketAssignedUsecase =>
  new UpdateTicketAssignedUsecase(ticketRepository, userRepository)

export const makeUpdateTicketAssignedUsecaseProvider = (): Provider => ({
  provide: UpdateTicketAssignedUsecase,
  inject: [TicketRepository, UserRepository],
  useFactory: makeUpdateTicketAssignedUsecase
})
