import { type UserEntity } from '@/domain/entities'
import { WhoAmIDto } from '@/presentation/resources'

export class WhoAmITransformer {
  static mapTo(data: UserEntity): WhoAmIDto {
    return new WhoAmIDto(
      data.id,
      data.email,
      data.firstName,
      data.lastName,
      data.roles.map((role) => role.name)
    )
  }
}
