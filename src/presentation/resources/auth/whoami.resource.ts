import { type Role, type UserEntity } from '@/domain/entities'

export class WhoAmIDto {
  constructor(
    readonly id: UserEntity['id'],
    readonly email: UserEntity['email'],
    readonly firstName: UserEntity['firstName'],
    readonly lastName: UserEntity['lastName'],
    readonly roles: Role[]
  ) {}
}
