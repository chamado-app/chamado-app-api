import { ChangeTicketStatusInputDto } from '@/domain/dtos'
import { type UserEntity } from '@/domain/entities'
import { type UpdateTicketStatusValidated } from '@/presentation/validation'

export class UpdateTicketStatusTransformer {
  static mapFrom(
    data: UpdateTicketStatusValidated,
    authenticatedUser: UserEntity
  ): ChangeTicketStatusInputDto {
    return new ChangeTicketStatusInputDto(data.status, authenticatedUser)
  }
}
