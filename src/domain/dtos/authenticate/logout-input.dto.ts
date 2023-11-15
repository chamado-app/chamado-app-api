import { type UserEntity } from '@/domain/entities'

export class LogoutInputDto {
  constructor(readonly authenticatedUser: UserEntity) {}
}
