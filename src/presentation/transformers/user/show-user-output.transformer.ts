import { type UserEntity } from '@/domain/entities'
import { ShowUserDto } from '@/presentation/resources'

type Entity = Partial<UserEntity> & {
  id: UserEntity['id']
}

export class ShowUserTransformer {
  static mapTo(entity: Entity): ShowUserDto {
    const name = `${entity.firstName} ${entity.lastName}`

    return new ShowUserDto(
      entity.id,
      entity.firstName,
      entity.lastName,
      name,
      entity.email,
      entity.isActive,
      entity.roles?.map((role) => role.name),
      entity.sectors?.map((sector) => sector.id),
      entity.createdAt,
      entity.updatedAt
    )
  }
}
