import { NotFoundException } from '@nestjs/common'

import { type Usecase } from '@/domain/base'
import { type CategoryEntity } from '@/domain/entities'
import { type CategoryRepository } from '@/domain/repositories'

export class ShowCategoryUsecase implements Usecase<CategoryEntity> {
  constructor(private readonly repository: CategoryRepository) {}

  async execute(id: string): Promise<CategoryEntity> {
    const category = await this.repository.getOne({ id, isActive: true })
    if (!category) throw new NotFoundException()
    return category
  }
}
