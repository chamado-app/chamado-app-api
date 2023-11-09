import { type UserEntity } from '@/domain/entities'

export class ListUsersUsecaseOutputDto {
  constructor(
    readonly users: UserEntity[],
    readonly total: number
  ) {}
}
