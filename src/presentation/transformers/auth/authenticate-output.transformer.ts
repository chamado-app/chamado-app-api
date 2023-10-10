import { type TokenEntity } from '@/domain/entities'
import { AuthenticateOutputDto } from '@/presentation/resources'

export class AuthenticateOutputTransformer {
  static mapTo(data: TokenEntity): AuthenticateOutputDto {
    return new AuthenticateOutputDto(data.type, data.token)
  }
}
