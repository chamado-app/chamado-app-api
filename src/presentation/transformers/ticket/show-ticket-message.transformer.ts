import { type TicketMessageEntity, type UserEntity } from '@/domain/entities'
import { ShowTicketMessageDto } from '@/presentation/resources/ticket'

export class ShowTicketMessageTransformer {
  static mapTo(
    entity: TicketMessageEntity,
    authenticatedUser: UserEntity
  ): ShowTicketMessageDto {
    const sentByMe = entity.sentBy.id === authenticatedUser.id

    return new ShowTicketMessageDto(
      entity.id,
      entity.text,
      entity.sentBy,
      entity.sentAt,
      entity.readAt,
      sentByMe,
      entity.type,
      entity.url
    )
  }
}
