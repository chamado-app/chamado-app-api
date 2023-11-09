import { ShowUserInputDto } from '@/domain/dtos'
import { type RoleEntity } from '@/domain/entities'

export class ShowUserInputTransformer {
  static mapFrom(id: string, roles: RoleEntity[]): ShowUserInputDto {
    const enumeratedRoles = roles.map((role) => role.name)
    return new ShowUserInputDto(id, enumeratedRoles)
  }
}
