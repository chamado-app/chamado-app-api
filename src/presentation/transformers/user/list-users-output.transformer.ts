import { type ListUsersUsecaseOutputDto } from '@/domain/dtos'
import { ListUsersOutputDto } from '@/presentation/resources'

import { ShowUserTransformer } from './show-user-output.transformer'

export class ListUsersOutputTransformer {
  static mapTo(data: ListUsersUsecaseOutputDto): ListUsersOutputDto {
    const { users, total } = data
    const transformedUsers = users.map((user) =>
      ShowUserTransformer.mapTo(user)
    )
    return new ListUsersOutputDto(transformedUsers, total)
  }
}
