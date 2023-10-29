import { type ListCategoriesUsecaseOutputDto } from '@/domain/dtos'
import { ListCategoriesOutputDto } from '@/presentation/resources'

import { ShowCategoryTransformer } from './show-category-output.transformer'

export class ListCategoriesOutputTransformer {
  static mapTo(data: ListCategoriesUsecaseOutputDto): ListCategoriesOutputDto {
    const { categories, total } = data
    const transformedCategories = categories.map((category) =>
      ShowCategoryTransformer.mapTo(category)
    )
    return new ListCategoriesOutputDto(transformedCategories, total)
  }
}
