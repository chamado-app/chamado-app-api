import { type CategoryEntity } from '@/domain/entities'

export class CreateCategoryInputDto {
  constructor(
    readonly name: CategoryEntity['name'],
    readonly description?: CategoryEntity['description'],
    readonly isActive: CategoryEntity['isActive'] = true
  ) {}
}
