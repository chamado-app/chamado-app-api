import { Entity } from '@/domain/base'

import { type TicketMessageDataEntity } from './ticket-message-data.entity'
import { type TicketEntity } from './ticket.entity'
import { type UserEntity } from './user.entity'

export class TicketMessageEntity extends Entity {
  data: TicketMessageDataEntity
  ticket: TicketEntity
  sentBy: UserEntity
  sentAt: Date
  readAt?: Date
}
