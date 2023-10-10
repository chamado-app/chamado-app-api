import { AuthenticateInputDto } from '@/presentation/resources'
import { type AuthenticateDto } from '@/shared/dtos'

export class AuthenticateInputTransformer {
  static mapFrom(data: AuthenticateDto): AuthenticateInputDto {
    return new AuthenticateInputDto(data.email, data.password)
  }
}
