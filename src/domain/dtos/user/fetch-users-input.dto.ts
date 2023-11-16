import { type Role } from '@/domain/entities'

export class FetchUsersInputDto {
  constructor(readonly showRoles?: Role[]) {}
}
