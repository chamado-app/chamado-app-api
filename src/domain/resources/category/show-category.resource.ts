import { type CategoryEntity } from '@/domain/entities'

export class CategoryShow {
  private constructor(
    readonly id: CategoryEntity['id'],
    readonly name: CategoryEntity['name'],
    readonly description: CategoryEntity['description'],
    readonly isActive: CategoryEntity['isActive'],
    readonly parentId: CategoryEntity['id'],
    readonly children: CategoryShow[],
    readonly createdAt: CategoryEntity['createdAt'],
    readonly updatedAt: CategoryEntity['updatedAt']
  ) {}

  static mapTo(category: CategoryEntity): CategoryShow {
    const children = category.children?.length
      ? category.children.map(CategoryShow.mapTo)
      : []

    return new CategoryShow(
      category.id,
      category.name,
      category.description,
      category.isActive,
      category.parent?.id,
      children,
      category.createdAt,
      category.updatedAt
    )
  }
}
