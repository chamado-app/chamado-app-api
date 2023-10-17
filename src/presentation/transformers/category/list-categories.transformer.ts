import { ShowCategoryTransformer } from './show-category.transformer'

import {
  type ListCategoriesUsecaseInputDto,
  type ListCategoriesUsecaseOutputDto
} from '@/domain/usecases'
import { ListCategoriesDto } from '@/presentation/resources'
import { type ListCategoriesValidated } from '@/presentation/validation'

export class ListCategoriesTransformer {
  static mapTo(payload: ListCategoriesUsecaseOutputDto): ListCategoriesDto {
    const { categories, total } = payload
    const transformedCategories = categories.map(ShowCategoryTransformer.mapTo)
    return new ListCategoriesDto(transformedCategories, total)
  }

  static mapFrom(
    payload: ListCategoriesValidated
  ): ListCategoriesUsecaseInputDto {
    const { take, skip } = payload
    return { take, skip }
  }
}
