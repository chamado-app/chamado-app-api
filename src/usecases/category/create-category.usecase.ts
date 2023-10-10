import { type Usecase } from '@/domain/base'
import { type Slugifier } from '@/domain/contracts'
import { type CategoryEntity } from '@/domain/entities'
import { type CategoryRepository } from '@/domain/repositories'

export class CreateCategoryUsecase implements Usecase<CategoryEntity> {
  constructor(
    private readonly repository: CategoryRepository,
    private readonly slugifier: Slugifier
  ) {}

  async execute(data: CategoryEntity): Promise<CategoryEntity> {
    const payload = await this.preparePayload(data)
    return this.repository.create(payload)
  }

  private async preparePayload(data: CategoryEntity): Promise<CategoryEntity> {
    const slug = this.slugifier.slugify(data.name)
    const uniqueSlug = await this.getUniqueSlug(slug)

    return { ...data, slug: uniqueSlug }
  }

  private async getUniqueSlug(slug: string, attempt = 0): Promise<string> {
    const uniqueSlug = attempt === 0 ? slug : `${slug}-${attempt}`
    const existingCategory = await this.repository.getCountBySlug(uniqueSlug)

    return !existingCategory
      ? uniqueSlug
      : this.getUniqueSlug(slug, attempt + 1)
  }
}
