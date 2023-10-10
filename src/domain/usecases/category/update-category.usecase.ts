import { NotFoundException } from '@nestjs/common'

import { type Usecase } from '@/domain/base'
import { type Slugifier } from '@/domain/contracts'
import { type CategoryEntity } from '@/domain/entities'
import { type CategoryRepository } from '@/domain/repositories'

export class UpdateCategoryUsecase implements Usecase<CategoryEntity> {
  constructor(
    private readonly repository: CategoryRepository,
    private readonly slugifier: Slugifier
  ) {}

  async execute(id: string, data: CategoryEntity): Promise<CategoryEntity> {
    const existingCategory = await this.repository.getOne({ id })

    if (!existingCategory) throw new NotFoundException()

    const payload = await this.prepareCategoryToUpdate(existingCategory, data)
    return this.repository.update(id, payload)
  }

  private async prepareCategoryToUpdate(
    existingCategory: CategoryEntity,
    updatedCategory: CategoryEntity
  ): Promise<CategoryEntity> {
    const { name: currentName } = existingCategory
    const { name: updatedName } = updatedCategory

    if (updatedName && updatedName !== currentName) {
      const slug = this.slugifier.slugify(updatedName)
      updatedCategory.slug = await this.getUniqueSlug(slug, existingCategory.id)
    } else {
      updatedCategory.slug = existingCategory.slug
    }

    return { ...existingCategory, ...updatedCategory }
  }

  private async getUniqueSlug(slug: string, id: string): Promise<string> {
    const existingCategory = await this.repository.getCountBySlug(slug, id)

    return !existingCategory
      ? slug
      : this.getUniqueSlug(`${slug}-${existingCategory + 1}`, id)
  }
}
