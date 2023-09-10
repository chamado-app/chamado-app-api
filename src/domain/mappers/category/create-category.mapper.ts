import { Mapper } from '@/domain/base'
import { CategoryEntity } from '@/domain/entities'
import { CreateCategoryDto } from '@/shared/dtos'

export class CreateCategoryMapper extends Mapper<
  CreateCategoryDto,
  CategoryEntity
> {
  mapFrom(data: CreateCategoryDto): CategoryEntity {
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

  mapTo(category: CategoryEntity): CreateCategoryDto {
    const data = new CreateCategoryDto()

    data.name = category.name
    data.description = category.description
    data.isActive = category.isActive
    data.parentId = category.parent?.id

    return data
  }
}
