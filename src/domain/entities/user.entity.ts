import { Entity } from '@/domain/base'

import { type CategoryEntity } from './category.entity'
import { type RoleEntity } from './role.entity'
import { type TokenEntity } from './token.entity'

export class UserEntity extends Entity {
  email: string
  password: string
  firstName: string
  lastName: string
  isActive: boolean
  roles: RoleEntity[]
  sectors?: CategoryEntity[]
  tokens?: TokenEntity[]
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
