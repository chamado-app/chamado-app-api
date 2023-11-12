import { Repository } from '@/domain/base'
import { type TicketMessageEntity } from '@/domain/entities'

export abstract class TicketMessageRepository extends Repository<TicketMessageEntity> {}
