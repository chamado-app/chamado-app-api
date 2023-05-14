import { Mapper } from '@/domain/base'
import { AuthenticatedDto } from '@/domain/dtos'
import { TokenEntity } from '@/domain/entities'

export class AuthenticatedMapper extends Mapper<AuthenticatedDto, TokenEntity> {
  mapFrom(data: AuthenticatedDto): TokenEntity {
    const token = new TokenEntity()

    token.token = data.accessToken
    token.type = data.type

    return token
  }

  mapTo(token: TokenEntity): AuthenticatedDto {
    const data = new AuthenticatedDto()

    data.accessToken = token.token
    data.type = token.type

    return data
  }
}
