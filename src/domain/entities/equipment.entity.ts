import { Entity } from '@/domain/base'

import { type TicketEntity } from './ticket.entity'

export enum EquipmentStatus {
  DAMAGED = 'damaged',
  IN_REPAIR = 'in_repair',
  WASTED = 'wasted',
  WAS_REMOVED = 'was_removed',
  WORKING = 'working'
}

export class EquipmentEntity extends Entity {
  name: string
  brand: string
  model: string
  type: string
  section: string
  status: EquipmentStatus
  serial?: string
  patrimony?: string
  additionalInfo?: string
  tickets?: TicketEntity[]
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
