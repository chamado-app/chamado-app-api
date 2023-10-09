import { type Usecase } from '@/domain/base'
import { type CategoryEntity } from '@/domain/entities'
import { type CategoryRepository } from '@/domain/repositories'

export class ListCategoriesUsecase implements Usecase<CategoryEntity[]> {
  constructor(private readonly repository: CategoryRepository) {}

  async execute(): Promise<CategoryEntity[]> {
    const categories = await this.repository.getMany()

    return this.sortCategories(categories)
  }

  private sortCategories(categories: CategoryEntity[]): CategoryEntity[] {
    return categories
      .map((category) => ({
        ...category,
        children: this.sortCategories(category.children)
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }
}
