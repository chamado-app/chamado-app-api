import { type TicketStatus, type UserEntity } from '@/domain/entities'

export class ChangeTicketStatusInputDto {
  constructor(
    readonly status: TicketStatus,
    readonly authenticatedUser: UserEntity
  ) {}
}
