import { AuthenticateInputDto } from '@/domain/dtos'
import { type AuthenticateValidated } from '@/presentation/validation'

export class AuthenticateInputTransformer {
  static mapFrom(data: AuthenticateValidated): AuthenticateInputDto {
    return new AuthenticateInputDto(data.email, data.password)
  }
}
