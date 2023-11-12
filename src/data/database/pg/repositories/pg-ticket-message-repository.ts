import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { PgTicketMessageEntity } from '@/data/database/pg/entities'
import { type TicketMessageEntity } from '@/domain/entities'
import { type TicketMessageRepository } from '@/domain/repositories'

import { PgRepository } from './pg-repository'

export class PgTicketMessageRepository
  extends PgRepository<TicketMessageEntity>
  implements TicketMessageRepository
{
  constructor(
    @InjectRepository(PgTicketMessageEntity)
    repository: Repository<PgTicketMessageEntity>
  ) {
    super(repository)
  }
}
