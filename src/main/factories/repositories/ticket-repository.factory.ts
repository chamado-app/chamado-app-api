import { type Provider } from '@nestjs/common'

import { PgTicketRepository } from '@/data/database/pg/repositories'
import { TicketRepository } from '@/domain/repositories'

export const makeTicketRepository = (): Provider => ({
  provide: TicketRepository,
  useClass: PgTicketRepository
})
