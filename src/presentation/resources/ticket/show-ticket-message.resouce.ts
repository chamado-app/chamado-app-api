import { type TicketMessageEntity } from '@/domain/entities'
import { type ShowUserDto } from '@/presentation/resources'

export class ShowTicketMessageDto {
  constructor(
    readonly id: TicketMessageEntity['id'],
    readonly text: TicketMessageEntity['text'],
    readonly sentAt: TicketMessageEntity['sentAt'],
    readonly readAt: TicketMessageEntity['readAt'],
    readonly sentByMe: boolean,
    readonly type: TicketMessageEntity['type'],
    readonly sentBy?: ShowUserDto,
    readonly url?: TicketMessageEntity['url']
  ) {}
}
