import { type Role } from '@/domain/entities'

export class ShowCategoryInputDto {
  constructor(
    readonly id: string,
    readonly roles: Role[]
  ) {}
}
