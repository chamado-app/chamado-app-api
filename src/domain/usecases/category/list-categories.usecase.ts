import { type GetManyOptions, type Usecase } from '@/domain/base'
import {
  type ListCategoriesInputDto,
  type ListCategoriesUsecaseOutputDto
} from '@/domain/dtos'
import { Role, type CategoryEntity } from '@/domain/entities'
import { type CategoryRepository } from '@/domain/repositories'

export class ListCategoriesUsecase
  implements Usecase<ListCategoriesUsecaseOutputDto>
{
  constructor(private readonly repository: CategoryRepository) {}

  async execute(
    options: ListCategoriesInputDto
  ): Promise<ListCategoriesUsecaseOutputDto> {
    const { take, skip, search, roles } = options
    const isManager = roles.includes(Role.MANAGER)

    const getOptions: GetManyOptions<CategoryEntity> = {
      take,
      skip,
      filter: {},
      orderBy: { name: 'ASC' }
    }

    if (!isManager) {
      Object.assign(getOptions, { filter: { isActive: true } })
    }

    if (search) {
      getOptions.search = {
        value: search,
        fields: ['description', 'id', 'name']
      }
    }

    const { items, total } = await this.repository.getMany(getOptions)
    return { categories: items, total }
  }
}
