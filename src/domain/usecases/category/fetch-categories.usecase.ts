import { type GetManyOptions, type Usecase } from '@/domain/base'
import { type CategoryEntity } from '@/domain/entities'
import { type CategoryRepository } from '@/domain/repositories'

export class FetchCategoriesUsecase implements Usecase<CategoryEntity[]> {
  constructor(private readonly repository: CategoryRepository) {}

  async execute(): Promise<CategoryEntity[]> {
    const getOptions: GetManyOptions<CategoryEntity> = {
      filter: { isActive: true },
      orderBy: { name: 'ASC' },
      fields: ['id', 'name', 'isActive']
    }

    const { items: categories } = await this.repository.getMany(getOptions)
    return categories
  }
}
