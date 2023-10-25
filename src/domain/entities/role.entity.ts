import { Entity } from '@/domain/base'

import { type UserEntity } from './user.entity'

export enum Role {
  MANAGER = 'manager',
  TECHNICIAN = 'technician',
  USER = 'user',
  GUEST = 'guest'
}

export class RoleEntity extends Entity {
  name: Role
  description: string
  isActive: boolean
  users?: UserEntity[]
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
