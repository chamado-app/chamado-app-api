import {
  ListCategoriesInputDto,
  type ListCategoriesUsecaseOutputDto
} from '@/domain/dtos'
import { type RoleEntity } from '@/domain/entities'
import { ListCategoriesOutputDto } from '@/presentation/resources'
import { type ListCategoriesValidated } from '@/presentation/validation'

import { ShowCategoryTransformer } from './show-category.transformer'

export class ListCategoriesTransformer {
  static mapTo(data: ListCategoriesUsecaseOutputDto): ListCategoriesOutputDto {
    const { categories, total } = data
    const transformedCategories = categories.map((category) =>
      ShowCategoryTransformer.mapTo(category)
    )
    return new ListCategoriesOutputDto(transformedCategories, total)
  }

  static mapFrom(
    data: ListCategoriesValidated,
    roles: RoleEntity[]
  ): ListCategoriesInputDto {
    const enumeratedRoles = roles.map((role) => role.name)
    return new ListCategoriesInputDto(
      data.take,
      data.skip,
      enumeratedRoles,
      data.search
    )
  }
}
