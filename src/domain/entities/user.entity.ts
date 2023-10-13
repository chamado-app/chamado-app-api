import { type TokenEntity } from './token.entity'

import { Entity } from '@/domain/base'

export class UserEntity extends Entity {
  email: string
  password: string
  firstName: string
  lastName: string
  isActive: boolean
  tokens?: TokenEntity[]
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
