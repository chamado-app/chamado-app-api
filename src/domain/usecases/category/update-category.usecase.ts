import { NotFoundException } from '@nestjs/common'

import { type Usecase } from '@/domain/base'
import { type Slugifier } from '@/domain/contracts'
import { type UpdateCategoryInputDto } from '@/domain/dtos'
import { type CategoryEntity } from '@/domain/entities'
import { type CategoryRepository } from '@/domain/repositories'

export class UpdateCategoryUsecase implements Usecase<CategoryEntity> {
  constructor(
    private readonly repository: CategoryRepository,
    private readonly slugifier: Slugifier
  ) {}

  async execute(
    id: string,
    data: UpdateCategoryInputDto
  ): Promise<CategoryEntity> {
    const existingCategory = await this.repository.getOne({ filter: { id } })

    if (!existingCategory) throw new NotFoundException()

    const payload = await this.prepareCategoryToUpdate(existingCategory, data)
    return this.repository.update(id, payload)
  }

  private async prepareCategoryToUpdate(
    existingCategory: CategoryEntity,
    updatedCategory: UpdateCategoryInputDto
  ): Promise<Partial<CategoryEntity>> {
    const { name: currentName } = existingCategory
    const { name: updatedName } = updatedCategory
    const category = { ...existingCategory, ...updatedCategory }

    if (updatedName && updatedName !== currentName) {
      const slug = this.slugifier.slugify(updatedName)
      category.slug = await this.getUniqueSlug(slug, existingCategory.id)
    } else {
      category.slug = existingCategory.slug
    }

    return category
  }

  private async getUniqueSlug(slug: string, id: string): Promise<string> {
    const existingCategory = await this.repository.getCountBySlug(slug, id)

    return !existingCategory
      ? slug
      : this.getUniqueSlug(`${slug}-${existingCategory + 1}`, id)
  }
}
