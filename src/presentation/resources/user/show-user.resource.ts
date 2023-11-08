import {
  type Role,
  type CategoryEntity,
  type UserEntity
} from '@/domain/entities'

export class ShowUserDto {
  constructor(
    readonly id: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string,
    readonly isActive: UserEntity['isActive'],
    readonly roles: Role[],
    readonly sectors: Array<CategoryEntity['id']>,
    readonly createdAt: UserEntity['createdAt'],
    readonly updatedAt: UserEntity['updatedAt']
  ) {}
}
