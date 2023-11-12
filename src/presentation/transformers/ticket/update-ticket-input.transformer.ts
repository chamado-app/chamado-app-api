import { ChangeTicketStatusInputDto } from '@/domain/dtos'
import { type UserEntity } from '@/domain/entities'
import { type UpdateTicketValidated } from '@/presentation/validation'

export class UpdateTicketTransformer {
  static mapFrom(
    data: UpdateTicketValidated,
    authenticatedUser: UserEntity
  ): ChangeTicketStatusInputDto {
    return new ChangeTicketStatusInputDto(data.status, authenticatedUser)
  }
}
