import { Entity } from '@/domain/base'

import { type CategoryEntity } from './category.entity'
import { type EquipmentEntity } from './equipment.entity'
import { type TicketMessageEntity } from './ticket-message.entity'
import { type UserEntity } from './user.entity'

export enum TicketStatus {
  NEW = 'new',
  AWAITING_RESPONSE = 'awaiting_response',
  IN_PROGRESS = 'in_progress',
  ANSWERED = 'answered',
  CANCELLED = 'cancelled',
  DONE = 'done'
}

export class TicketEntity extends Entity {
  title: string
  messages: TicketMessageEntity[]
  category: CategoryEntity
  reportedBy: UserEntity
  assignedTo?: UserEntity
  equipment: EquipmentEntity
  status: TicketStatus
  createdAt: Date
  updatedAt: Date
}
