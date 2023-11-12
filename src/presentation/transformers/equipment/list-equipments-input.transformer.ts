import { ListEquipmentsInputDto } from '@/domain/dtos'
import { type RoleEntity } from '@/domain/entities'
import { type ListEquipmentsValidated } from '@/presentation/validation'

export class ListEquipmentsInputTransformer {
  static mapFrom(
    data: ListEquipmentsValidated,
    roles: RoleEntity[]
  ): ListEquipmentsInputDto {
    const enumeratedRoles = roles.map((role) => role.name)
    return new ListEquipmentsInputDto(
      data.take,
      data.skip,
      enumeratedRoles,
      data.search
    )
  }
}
