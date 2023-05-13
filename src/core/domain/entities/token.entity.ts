import { Entity } from 'src/core/base/entity'

import { type UserEntity } from './user.entity'

export class TokenEntity extends Entity {
  token: string
  type: string
  user: UserEntity
}
