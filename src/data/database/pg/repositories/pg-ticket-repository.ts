import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { PgTicketEntity } from '@/data/database/pg/entities'
import { type TicketEntity } from '@/domain/entities'
import { type TicketRepository } from '@/domain/repositories'

import { PgRepository } from './pg-repository'

export class PgTicketRepository
  extends PgRepository<TicketEntity>
  implements TicketRepository
{
  constructor(
    @InjectRepository(PgTicketEntity)
    repository: Repository<PgTicketEntity>
  ) {
    super(repository)
  }
}
