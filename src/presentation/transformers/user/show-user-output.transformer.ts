import { type UserEntity } from '@/domain/entities'
import { ShowUserDto } from '@/presentation/resources'

type Entity = Partial<UserEntity> & {
  id: UserEntity['id']
}

export class ShowUserTransformer {
  static mapTo(entity: Entity): ShowUserDto {
    return new ShowUserDto(
      entity.id,
      entity.firstName,
      entity.lastName,
      entity.email,
      entity.isActive,
      entity.roles?.map((role) => role.name),
      entity.sectors?.map((sector) => sector.id),
      entity.createdAt,
      entity.updatedAt
    )
  }
}
