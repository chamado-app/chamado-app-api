import { Mapper } from 'src/core/base/mapper'
import { AuthenticatedDto } from 'src/shared/dtos/authenticated.dto'

import { type TokenEntity } from '../entities/token.entity'

export class AuthenticatedMapper extends Mapper<AuthenticatedDto, TokenEntity> {
  mapFrom(param: AuthenticatedDto): TokenEntity {
    throw new Error('Method not implemented.')
  }

  mapTo(entity: TokenEntity): AuthenticatedDto {
    const token = new AuthenticatedDto()

    token.accessToken = entity.token
    token.type = entity.type

    return token
  }
}
