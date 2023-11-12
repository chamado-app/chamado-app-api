import { type TicketMessageEntity } from '@/domain/entities'

export class ShowTicketMessageDto {
  constructor(
    readonly id: TicketMessageEntity['id'],
    readonly text: TicketMessageEntity['text'],
    readonly sentBy: TicketMessageEntity['sentBy'],
    readonly sentAt: TicketMessageEntity['sentAt'],
    readonly readAt: TicketMessageEntity['readAt'],
    readonly sentByMe: boolean,
    readonly type: TicketMessageEntity['type'],
    readonly url?: TicketMessageEntity['url']
  ) {}
}
