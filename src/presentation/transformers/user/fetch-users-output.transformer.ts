import { type UserEntity } from '@/domain/entities'

export class FetchUsersItemDto {
  constructor(
    readonly id: string,
    readonly name: string
  ) {}
}

export class FetchUsersOutputTransformer {
  static mapTo(users: UserEntity[]): FetchUsersItemDto[] {
    return users.map((user) => {
      const name = `${user.firstName} ${user.lastName}`
      return new FetchUsersItemDto(user.id, name)
    })
  }
}
