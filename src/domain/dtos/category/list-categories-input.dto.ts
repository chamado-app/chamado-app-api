import { type Role } from '@/domain/entities'

export class ListCategoriesInputDto {
  constructor(
    readonly take: number = 20,
    readonly skip: number = 0,
    readonly roles: Role[],
    readonly search?: string
  ) {}
}
