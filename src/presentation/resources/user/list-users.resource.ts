import { type ShowUserDto } from './show-user.resource'

export class ListUsersOutputDto {
  constructor(
    readonly users: ShowUserDto[],
    readonly total: number
  ) {}
}
