import { type GetManyOptions, type Usecase } from '@/domain/base'
import {
  type ListCategoriesInputDto,
  type ListCategoriesUsecaseOutputDto
} from '@/domain/dtos'
import { type CategoryEntity } from '@/domain/entities'
import { type CategoryRepository } from '@/domain/repositories'

export class ListCategoriesUsecase
  implements Usecase<ListCategoriesUsecaseOutputDto>
{
  constructor(private readonly repository: CategoryRepository) {}

  async execute(
    options: ListCategoriesInputDto
  ): Promise<ListCategoriesUsecaseOutputDto> {
    const { take, skip, search } = options
    const getOptions: GetManyOptions<CategoryEntity> = {
      take,
      skip,
      filter: { isActive: true },
      orderBy: { name: 'ASC' }
    }

    if (search) {
      getOptions.search = { value: search, fields: ['name', 'description'] }
    }

    const { items, total } = await this.repository.getMany(getOptions)
    return { categories: items, total }
  }
}
