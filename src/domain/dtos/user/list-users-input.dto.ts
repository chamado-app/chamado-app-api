import { type Role } from '@/domain/entities'

export class ListUsersInputDto {
  constructor(
    readonly take: number = 20,
    readonly skip: number = 0,
    readonly roles: Role[],
    readonly search?: string
  ) {}
}
