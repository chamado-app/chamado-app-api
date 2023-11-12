import { type UserEntity } from '@/domain/entities'

export class ListTicketsInputDto {
  constructor(
    readonly take: number = 20,
    readonly skip: number = 0,
    readonly authenticatedUser: UserEntity,
    readonly search?: string
  ) {}
}
