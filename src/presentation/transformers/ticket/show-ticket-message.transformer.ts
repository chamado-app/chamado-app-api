import { type TicketMessageEntity, type UserEntity } from '@/domain/entities'
import { ShowTicketMessageDto } from '@/presentation/resources/ticket'

import { ShowUserTransformer } from '../user'

export class ShowTicketMessageTransformer {
  static mapTo(
    entity: TicketMessageEntity,
    authenticatedUser: UserEntity
  ): ShowTicketMessageDto {
    const sentBy = entity.sentBy
      ? ShowUserTransformer.mapTo(entity.sentBy)
      : undefined
    const sentByMe = !!sentBy && sentBy.id === authenticatedUser.id

    return new ShowTicketMessageDto(
      entity.id,
      entity.text,
      entity.sentAt,
      entity.readAt,
      sentByMe,
      entity.type,
      sentBy,
      entity.url
    )
  }
}
