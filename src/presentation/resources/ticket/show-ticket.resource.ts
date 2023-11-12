import { type TicketEntity } from '@/domain/entities'
import {
  type ShowCategoryDto,
  type ShowEquipmentDto,
  type ShowUserDto
} from '@/presentation/resources'

import { type ShowTicketMessageDto } from './show-ticket-message.resouce'

export class ShowTicketDto {
  constructor(
    readonly id: TicketEntity['id'],
    readonly title: TicketEntity['title'],
    readonly messages: ShowTicketMessageDto[],
    readonly reportedBy: ShowUserDto,
    readonly equipment: ShowEquipmentDto,
    readonly category: ShowCategoryDto,
    readonly status: TicketEntity['status'],
    readonly createdAt: TicketEntity['createdAt'],
    readonly updatedAt: TicketEntity['updatedAt'],
    readonly assignedTo?: ShowUserDto
  ) {}
}
