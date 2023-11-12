import { Entity } from '@/domain/base'

export enum TicketMessageType {
  TEXT = 'text',
  IMAGE = 'image',
  SYSTEM = 'system'
}

export class TicketMessageDataEntity extends Entity {
  text: string
  url?: string
  type: TicketMessageType
}
