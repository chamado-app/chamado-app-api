import { type UserEntity } from './user.entity'

import { Entity } from '@/domain/base'

export enum TokenType {
  JWT = 'Bearer'
}

export class TokenEntity extends Entity {
  token: string
  type: TokenType
  user: UserEntity
}
