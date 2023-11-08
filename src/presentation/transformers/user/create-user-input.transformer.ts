import { CreateUserInputDto } from '@/domain/dtos'
import { type CreateUserValidated } from '@/presentation/validation'

export class CreateUserTransformer {
  static mapFrom(data: CreateUserValidated): CreateUserInputDto {
    return new CreateUserInputDto(
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
