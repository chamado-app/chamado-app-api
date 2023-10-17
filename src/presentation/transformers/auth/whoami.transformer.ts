import { type UserEntity } from '@/domain/entities'
import { WhoAmIOutputDto } from '@/presentation/resources'

export class WhoAmITransformer {
  static mapTo(data: UserEntity): WhoAmIOutputDto {
    return new WhoAmIOutputDto(
      data.id,
      data.email,
      data.firstName,
      data.lastName,
      data.roles.map((role) => role.name)
    )
  }
}
