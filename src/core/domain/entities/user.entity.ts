import { Entity } from 'src/core/base/entity'

import { type TokenEntity } from './token.entity'

export class UserEntity extends Entity {
  email: string
  password: string
  tokens?: TokenEntity[]
}
