import { type TicketEntity } from '@/domain/entities'

export class ListTicketsItemDto {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly status: TicketEntity['status'],
    readonly category: string,
    readonly totalMessages: number,
    readonly lastMessage: string,
    readonly lastMessageAt: Date,
    readonly reportedBy: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly assignedTo?: string
  ) {}
}

export class ListTicketsOutputDto {
  constructor(
    readonly tickets: ListTicketsItemDto[],
    readonly total: number
  ) {}
}
