import {
  ListCategoriesInputDto,
  type ListCategoriesUsecaseOutputDto
} from '@/domain/dtos'
import { ListCategoriesOutputDto } from '@/presentation/resources'
import { type ListCategoriesValidated } from '@/presentation/validation'

import { ShowCategoryTransformer } from './show-category.transformer'

export class ListCategoriesTransformer {
  static mapTo(data: ListCategoriesUsecaseOutputDto): ListCategoriesOutputDto {
    const { categories, total } = data
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const transformedCategories = categories.map(ShowCategoryTransformer.mapTo)
    return new ListCategoriesOutputDto(transformedCategories, total)
  }

  static mapFrom(data: ListCategoriesValidated): ListCategoriesInputDto {
    return new ListCategoriesInputDto(data.take, data.skip, data.search)
  }
}
