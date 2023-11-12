import { type TicketEntity, type UserEntity } from '@/domain/entities'
import { ShowTicketDto } from '@/presentation/resources/ticket'
import {
  ShowCategoryTransformer,
  ShowEquipmentTransformer,
  ShowUserTransformer
} from '@/presentation/transformers'

import { ShowTicketMessageTransformer } from './show-ticket-message.transformer'

export class ShowTicketTransformer {
  static mapTo(
    entity: TicketEntity,
    authenticatedUser: UserEntity
  ): ShowTicketDto {
    const messages = entity.messages.map((message) =>
      ShowTicketMessageTransformer.mapTo(message, authenticatedUser)
    )
    const reportedBy = ShowUserTransformer.mapTo(entity.reportedBy)
    const equipment = ShowEquipmentTransformer.mapTo(entity.equipment)
    const category = ShowCategoryTransformer.mapTo(entity.category)
    const assignedTo = entity.assignedTo
      ? ShowUserTransformer.mapTo(entity.assignedTo)
      : undefined

    return new ShowTicketDto(
      entity.id,
      entity.title,
      messages,
      reportedBy,
      equipment,
      category,
      entity.status,
      entity.createdAt,
      entity.updatedAt,
      assignedTo
    )
  }
}
