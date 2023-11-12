import { type TicketEntity, type UserEntity } from '@/domain/entities'

export class CreateTicketTextMessageInputDto {
  constructor(
    readonly ticketId: TicketEntity['id'],
    readonly message: string,
    readonly sentBy: UserEntity
  ) {}
}
