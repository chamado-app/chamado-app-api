import { type TicketEntity, type UserEntity } from '@/domain/entities'
import { ShowTicketDto } from '@/presentation/resources/ticket'

import { ShowTicketMessageTransformer } from './show-ticket-message.transformer'

export class ShowTicketTransformer {
  static mapTo(
    entity: TicketEntity,
    authenticatedUser: UserEntity
  ): ShowTicketDto {
    const messages = entity.messages.map((message) =>
      ShowTicketMessageTransformer.mapTo(message, authenticatedUser)
    )

    return new ShowTicketDto(
      entity.id,
      entity.title,
      messages,
      entity.reportedBy,
      entity.equipment,
      entity.category,
      entity.status,
      entity.createdAt,
      entity.updatedAt
    )
  }
}
