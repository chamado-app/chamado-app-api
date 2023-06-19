import { Mapper } from '@/domain/base'
import { TokenEntity } from '@/domain/entities'
import { AuthenticatedDto } from '@/shared/dtos'

export class AuthenticatedMapper extends Mapper<AuthenticatedDto, TokenEntity> {
  mapFrom(data: AuthenticatedDto): TokenEntity {
    const token = new TokenEntity()

    token.token = data.accessToken
    token.type = data.type

    return token
  }

  mapTo(token: TokenEntity): AuthenticatedDto {
    const data = new AuthenticatedDto()

    data.type = token.type
    data.accessToken = token.token

    return data
  }
}
