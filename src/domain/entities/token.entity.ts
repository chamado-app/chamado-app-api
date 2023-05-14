import { type UserEntity } from './user.entity'

import { Entity } from '@/domain/base'

export class TokenEntity extends Entity {
  token: string
  type: string
  user: UserEntity
}
