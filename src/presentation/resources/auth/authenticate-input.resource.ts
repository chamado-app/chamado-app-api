import { type UserEntity } from '@/domain/entities'

export class AuthenticateInputDto {
  constructor(
    readonly email: UserEntity['email'],
    readonly password: UserEntity['password']
  ) {}
}
