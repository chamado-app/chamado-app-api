import { type Usecase } from '@/domain/base'
import { type CategoryEntity } from '@/domain/entities'
import { type CategoryRepository } from '@/domain/repositories'

export class ShowCategoryUsecase implements Usecase<CategoryEntity> {
  constructor(private readonly repository: CategoryRepository) {}

  async execute(id: string): Promise<CategoryEntity> {
    return await this.repository.getOne({ id, isActive: true })
  }
}
