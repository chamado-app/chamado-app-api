import { type ShowCategoryDto } from './show-category.resource'

export class ListCategoriesDto {
  constructor(readonly categories: ShowCategoryDto[], readonly total: number) {}
}
