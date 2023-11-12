import { type UserEntity } from '@/domain/entities'

export class ShowTicketInputDto {
  constructor(
    readonly id: string,
    readonly authenticatedUser: UserEntity
  ) {}
}
