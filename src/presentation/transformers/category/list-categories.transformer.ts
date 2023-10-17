import { ShowCategoryTransformer } from './show-category.transformer'

import {
  type ListCategoriesUsecaseInputDto,
  type ListCategoriesUsecaseOutputDto
} from '@/domain/usecases'
import { ListCategoriesOutputDto } from '@/presentation/resources'
import { type ListCategoriesValidated } from '@/presentation/validation'

export class ListCategoriesTransformer {
  static mapTo(data: ListCategoriesUsecaseOutputDto): ListCategoriesOutputDto {
    const { categories, total } = data
    const transformedCategories = categories.map(ShowCategoryTransformer.mapTo)
    return new ListCategoriesOutputDto(transformedCategories, total)
  }

  static mapFrom(data: ListCategoriesValidated): ListCategoriesUsecaseInputDto {
    const { take, skip } = data
    return { take, skip }
  }
}
