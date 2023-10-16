import { type CategoryEntity } from '@/domain/entities'

export class ShowCategoryDto {
  constructor(
    readonly id: CategoryEntity['id'],
    readonly name: CategoryEntity['name'],
    readonly slug: CategoryEntity['slug'],
    readonly description: CategoryEntity['description'],
    readonly isActive: CategoryEntity['isActive'],
    readonly createdAt: CategoryEntity['createdAt'],
    readonly updatedAt: CategoryEntity['updatedAt']
  ) {}
}
