import { type Usecase } from '@/domain/base'
import { type CategoryEntity } from '@/domain/entities'
import { type CategoryRepository } from '@/domain/repositories'

export class ListCategoriesUsecase implements Usecase<CategoryEntity[]> {
  constructor(private readonly repository: CategoryRepository) {}

  async execute(): Promise<CategoryEntity[]> {
    const categories = await this.repository.getMany()

    return categories
  }
}
