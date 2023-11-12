import { type TicketMessageEntity } from '@/domain/entities'
import { type ShowUserDto } from '@/presentation/resources'

export class ShowTicketMessageDto {
  constructor(
    readonly id: TicketMessageEntity['id'],
    readonly text: TicketMessageEntity['text'],
    readonly sentBy: ShowUserDto,
    readonly sentAt: TicketMessageEntity['sentAt'],
    readonly readAt: TicketMessageEntity['readAt'],
    readonly sentByMe: boolean,
    readonly type: TicketMessageEntity['type'],
    readonly url?: TicketMessageEntity['url']
  ) {}
}
