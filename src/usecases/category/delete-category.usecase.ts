import { type Usecase } from '@/domain/base'
import { type CategoryRepository } from '@/domain/repositories'

export class DeleteCategoryUsecase implements Usecase<void> {
  constructor(private readonly repository: CategoryRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete({ id })
  }
}
