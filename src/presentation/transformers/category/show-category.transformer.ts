import { CategoryEntity } from '@/domain/entities'
import { ShowCategoryDto } from '@/presentation/resources'

export class ShowCategoryTransformer {
  static mapFrom(data: ShowCategoryDto): CategoryEntity {
    const category = new CategoryEntity()

    category.name = data.name
    category.description = data.description
    category.isActive = data.isActive

    if (data.parentId) {
      const parent = new CategoryEntity()
      parent.id = data.parentId
      category.parent = parent
    }

    return category
  }

  static mapTo(entity: CategoryEntity): ShowCategoryDto {
    const children = entity.children?.length
      ? entity.children.map(ShowCategoryTransformer.mapTo)
      : []

    return new ShowCategoryDto(
      entity.id,
      entity.name,
      entity.slug,
      entity.description,
      entity.isActive,
      entity.parent?.id,
      children,
      entity.createdAt,
      entity.updatedAt
    )
  }
}
