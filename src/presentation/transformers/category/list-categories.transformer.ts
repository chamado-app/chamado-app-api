import { ShowCategoryTransformer } from './show-category.transformer'

import { type CategoryEntity } from '@/domain/entities'
import { ListCategoriesDto } from '@/presentation/resources'

export class ListCategoriesTransformer {
  static mapTo(categories: CategoryEntity[]): ListCategoriesDto {
    const data = categories.map(ShowCategoryTransformer.mapTo)
    return new ListCategoriesDto(data)
  }
}
