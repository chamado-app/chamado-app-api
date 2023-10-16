import { CategoryEntity } from '@/domain/entities'
import { ShowCategoryDto } from '@/presentation/resources'

export class ShowCategoryTransformer {
  static mapFrom(data: ShowCategoryDto): CategoryEntity {
    const category = new CategoryEntity()

    category.name = data.name
    category.description = data.description
    category.isActive = data.isActive

    return category
  }

  static mapTo(entity: CategoryEntity): ShowCategoryDto {
    return new ShowCategoryDto(
      entity.id,
      entity.name,
      entity.slug,
      entity.description,
      entity.isActive,
      entity.createdAt,
      entity.updatedAt
    )
  }
}
