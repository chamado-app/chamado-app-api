import { CreateTicketInputDto } from '@/domain/dtos'
import { type UserEntity } from '@/domain/entities'
import { type CreateTicketValidated } from '@/presentation/validation'

export class CreateTicketTransformer {
  static mapFrom(
    data: CreateTicketValidated,
    reportedBy: UserEntity
  ): CreateTicketInputDto {
    return new CreateTicketInputDto(
      data.title,
      data.message,
      data.categoryId,
      reportedBy,
      data.equipmentId
    )
  }
}
