import { type TicketEntity } from '@/domain/entities'

import { type ShowTicketMessageDto } from './show-ticket-message.resouce'

export class ShowTicketDto {
  constructor(
    readonly id: TicketEntity['id'],
    readonly title: TicketEntity['title'],
    readonly messages: ShowTicketMessageDto[],
    readonly reportedBy: TicketEntity['reportedBy'],
    readonly equipment: TicketEntity['equipment'],
    readonly category: TicketEntity['category'],
    readonly status: TicketEntity['status'],
    readonly createdAt: TicketEntity['createdAt'],
    readonly updatedAt: TicketEntity['updatedAt']
  ) {}
}
