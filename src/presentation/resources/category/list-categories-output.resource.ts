import { type ShowCategoryDto } from './show-category.resource'

export class ListCategoriesOutputDto {
  constructor(
    readonly categories: ShowCategoryDto[],
    readonly total: number
  ) {}
}
