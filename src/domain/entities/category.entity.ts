import { Entity } from '@/domain/base'

import { type TicketEntity } from './ticket.entity'
import { type UserEntity } from './user.entity'

export class CategoryEntity extends Entity {
  name: string
  slug: string
  description?: string | null
  isActive: boolean
  users: UserEntity[]
  tickets?: TicketEntity[]
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
