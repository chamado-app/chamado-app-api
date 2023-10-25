import { Entity } from '@/domain/base'

import { type UserEntity } from './user.entity'

export enum TokenType {
  JWT = 'Bearer'
}

export class TokenEntity extends Entity {
  token: string
  type: TokenType
  user: UserEntity
}
