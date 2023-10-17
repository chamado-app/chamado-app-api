import { type CategoryEntity } from '@/domain/entities'

export class CreateCategoryInputDto {
  constructor(
    readonly name: CategoryEntity['name'],
    readonly isActive: CategoryEntity['isActive'] = true,
    readonly description?: CategoryEntity['description']
  ) {}
}
