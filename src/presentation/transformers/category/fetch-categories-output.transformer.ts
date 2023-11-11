import { type CategoryEntity } from '@/domain/entities'
import { type ShowCategoryDto } from '@/presentation/resources'

import { ShowCategoryTransformer } from './show-category-output.transformer'

export class FetchCategoriesOutputTransformer {
  static mapTo(categories: CategoryEntity[]): ShowCategoryDto[] {
    return categories.map((category) => ShowCategoryTransformer.mapTo(category))
  }
}
