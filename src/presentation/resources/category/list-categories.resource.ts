import { CategoryShow } from './show-category.resource'

import { type CategoryEntity } from '@/domain/entities'

export class CategoriesList {
  private constructor(readonly categories: CategoryShow[]) {}

  static mapTo(categories: CategoryEntity[]): CategoriesList {
    return new CategoriesList(categories.map(CategoryShow.mapTo))
  }
}
