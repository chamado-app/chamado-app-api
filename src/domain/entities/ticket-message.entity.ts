import { Entity } from '@/domain/base'

import { type TicketEntity } from './ticket.entity'
import { type UserEntity } from './user.entity'

export enum TicketMessageType {
  TEXT = 'text',
  IMAGE = 'image',
  SYSTEM = 'system'
}

export class TicketMessageEntity extends Entity {
  text: string
  url?: string
  type: TicketMessageType
  ticket: TicketEntity
  sentBy: UserEntity
  sentAt: Date
  readAt?: Date
}
