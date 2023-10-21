import { ShowCategoryTransformer } from './show-category.transformer'

import {
  ListCategoriesInputDto,
  type ListCategoriesUsecaseOutputDto
} from '@/domain/dtos'
import { ListCategoriesOutputDto } from '@/presentation/resources'
import { type ListCategoriesValidated } from '@/presentation/validation'

export class ListCategoriesTransformer {
  static mapTo(data: ListCategoriesUsecaseOutputDto): ListCategoriesOutputDto {
    const { categories, total } = data
    const transformedCategories = categories.map(ShowCategoryTransformer.mapTo)
    return new ListCategoriesOutputDto(transformedCategories, total)
  }

  static mapFrom(data: ListCategoriesValidated): ListCategoriesInputDto {
    return new ListCategoriesInputDto(data.take, data.skip, data.search)
  }
}
