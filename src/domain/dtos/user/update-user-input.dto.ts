import {
  type CategoryEntity,
  type Role,
  type UserEntity
} from '@/domain/entities'

export class UpdateUserInputDto {
  constructor(
    readonly firstName?: UserEntity['firstName'],
    readonly lastName?: UserEntity['lastName'],
    readonly email?: UserEntity['email'],
    readonly password?: UserEntity['password'],
    readonly roles?: Role[],
    readonly sectors?: Array<CategoryEntity['id']>,
    readonly isActive?: UserEntity['isActive']
  ) {}
}
