import { type Role } from '@/domain/entities'

export class ShowUserInputDto {
  constructor(
    readonly id: string,
    readonly roles: Role[]
  ) {}
}
