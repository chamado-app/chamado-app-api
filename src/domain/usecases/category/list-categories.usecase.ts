import { type Usecase } from '@/domain/base'
import {
  type ListCategoriesInputDto,
  type ListCategoriesUsecaseOutputDto
} from '@/domain/dtos'
import { type CategoryRepository } from '@/domain/repositories'

export class ListCategoriesUsecase
  implements Usecase<ListCategoriesUsecaseOutputDto>
{
  constructor(private readonly repository: CategoryRepository) {}

  async execute(
    options: ListCategoriesInputDto
  ): Promise<ListCategoriesUsecaseOutputDto> {
    const { items: categories, total } = await this.repository.getMany({
      ...options,
      filter: { isActive: true },
      orderBy: { name: 'ASC' }
    })

    return { categories, total }
  }
}
