import { ListUsersInputDto } from '@/domain/dtos'
import { type RoleEntity } from '@/domain/entities'
import { type ListUsersValidated } from '@/presentation/validation'

export class ListUsersInputTransformer {
  static mapFrom(
    data: ListUsersValidated,
    roles: RoleEntity[]
  ): ListUsersInputDto {
    const enumeratedRoles = roles.map((role) => role.name)
    return new ListUsersInputDto(
      data.take,
      data.skip,
      enumeratedRoles,
      data.search
    )
  }
}
