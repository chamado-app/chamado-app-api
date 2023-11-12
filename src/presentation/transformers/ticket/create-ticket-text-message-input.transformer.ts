import { CreateTicketTextMessageInputDto } from '@/domain/dtos'
import { type UserEntity } from '@/domain/entities'
import { type CreateTicketTextMessageValidated } from '@/presentation/validation'

export class CreateTicketTextMessageInputTransformer {
  static mapFrom(
    data: CreateTicketTextMessageValidated,
    ticketId: string,
    authenticatedUser: UserEntity
  ): CreateTicketTextMessageInputDto {
    return new CreateTicketTextMessageInputDto(
      ticketId,
      data.text,
      authenticatedUser
    )
  }
}
