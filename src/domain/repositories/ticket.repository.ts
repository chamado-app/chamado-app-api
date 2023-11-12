import { Repository } from '@/domain/base'
import { type TicketEntity } from '@/domain/entities'

export abstract class TicketRepository extends Repository<TicketEntity> {}
