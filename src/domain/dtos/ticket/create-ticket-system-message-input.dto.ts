import { type TicketEntity } from '@/domain/entities'

export class CreateTicketSystemMessageInputDto {
  constructor(
    readonly ticketId: TicketEntity['id'],
    readonly message: string
  ) {}
}
