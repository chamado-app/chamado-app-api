import { LogoutInputDto } from '@/domain/dtos'
import { type UserEntity } from '@/domain/entities'

export class LogoutInputTransformer {
  static mapFrom(authenticatedUser: UserEntity): LogoutInputDto {
    return new LogoutInputDto(authenticatedUser)
  }
}
