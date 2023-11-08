import { UpdateUserInputDto } from '@/domain/dtos'
import { type UpdateUserValidated } from '@/presentation/validation'

export class UpdateUserTransformer {
  static mapFrom(data: UpdateUserValidated): UpdateUserInputDto {
    return new UpdateUserInputDto(
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.roles,
      data.sectors,
      data.isActive
    )
  }
}
