import { CategoryEntity } from '@/domain/entities'
import { type CreateCategoryDto } from '@/shared/dtos'

export class CreateCategoryTransformer {
  static mapFrom(data: CreateCategoryDto): CategoryEntity {
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
}
