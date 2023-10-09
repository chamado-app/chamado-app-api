import { NotFoundException } from '@nestjs/common'

import { type Usecase } from '@/domain/base'
import { type Slugifier } from '@/domain/contracts'
import { type CategoryEntity } from '@/domain/entities'
import { UpdateCategoryMapper } from '@/domain/mappers'
import { type CategoryRepository } from '@/domain/repositories'
import { type UpdateCategoryDto } from '@/shared/dtos'

export class UpdateCategoryUsecase implements Usecase<CategoryEntity> {
  constructor(
    private readonly repository: CategoryRepository,
    private readonly slugifier: Slugifier,
    private readonly mapper = new UpdateCategoryMapper()
  ) {}

  async execute(id: string, data: UpdateCategoryDto): Promise<CategoryEntity> {
    const existingCategory = await this.repository.getOne({ id })
    if (!existingCategory) throw new NotFoundException()

    const payload = await this.prepareCategoryToUpdate(existingCategory, data)
    return this.repository.update(id, payload)
  }

  private async prepareCategoryToUpdate(
    existingCategory: CategoryEntity,
    data: UpdateCategoryDto
  ): Promise<CategoryEntity> {
    const payload = this.mapper.mapFrom(data)

    if (payload.name && payload.name !== existingCategory.name) {
      const slug = this.slugifier.slugify(payload.name)
      payload.slug = await this.getUniqueSlug(slug, existingCategory.id)
    } else {
      payload.slug = existingCategory.slug
    }

    return { ...existingCategory, ...payload }
  }

  private async getUniqueSlug(slug: string, id: string): Promise<string> {
    const existingCategory = await this.repository.getCountBySlug(slug, id)

    return !existingCategory
      ? slug
      : this.getUniqueSlug(`${slug}-${existingCategory + 1}`, id)
  }
}
