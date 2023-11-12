import { type Provider } from '@nestjs/common'

import { PgTicketMessageRepository } from '@/data/database/pg/repositories'
import { TicketMessageRepository } from '@/domain/repositories'

export const makeTicketMessageRepository = (): Provider => ({
  provide: TicketMessageRepository,
  useClass: PgTicketMessageRepository
})
