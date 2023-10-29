import { ListCategoriesInputDto } from '@/domain/dtos'
import { type RoleEntity } from '@/domain/entities'
import { type ListCategoriesValidated } from '@/presentation/validation'

export class ListCategoriesInputTransformer {
  static mapFrom(
    data: ListCategoriesValidated,
    roles: RoleEntity[]
  ): ListCategoriesInputDto {
    const enumeratedRoles = roles.map((role) => role.name)
    return new ListCategoriesInputDto(
      data.take,
      data.skip,
      enumeratedRoles,
      data.search
    )
  }
}
