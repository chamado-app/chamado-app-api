import { ShowCategoryInputDto } from '@/domain/dtos'
import { type RoleEntity } from '@/domain/entities'

export class ShowCategoryInputTransformer {
  static mapFrom(id: string, roles: RoleEntity[]): ShowCategoryInputDto {
    const enumeratedRoles = roles.map((role) => role.name)
    return new ShowCategoryInputDto(id, enumeratedRoles)
  }
}
