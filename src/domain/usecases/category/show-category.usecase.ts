import { NotFoundException } from '@nestjs/common'

import { type Usecase } from '@/domain/base'
import { type ShowCategoryInputDto } from '@/domain/dtos'
import { Role, type CategoryEntity } from '@/domain/entities'
import { type CategoryRepository } from '@/domain/repositories'

export class ShowCategoryUsecase implements Usecase<CategoryEntity> {
  constructor(private readonly repository: CategoryRepository) {}

  async execute({ id, roles }: ShowCategoryInputDto): Promise<CategoryEntity> {
    const isManager = roles.includes(Role.MANAGER)
    const searchParams: Partial<CategoryEntity> = { id }
    if (!isManager) searchParams.isActive = true

    const category = await this.repository.getOne(searchParams)
    if (!category) throw new NotFoundException()
    return category
  }
}
