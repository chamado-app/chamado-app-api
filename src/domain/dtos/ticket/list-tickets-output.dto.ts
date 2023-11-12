import { type TicketEntity } from '@/domain/entities'

export class ListTicketsUsecaseOutputDto {
  constructor(
    readonly tickets: TicketEntity[],
    readonly total: number
  ) {}
}
