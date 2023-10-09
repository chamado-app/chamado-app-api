import { type Usecase } from '@/domain/base'
import { type Slugifier } from '@/domain/contracts'
import { type CategoryEntity } from '@/domain/entities'
import { CreateCategoryMapper } from '@/domain/mappers'
import { type CategoryRepository } from '@/domain/repositories'
import { type CreateCategoryDto } from '@/shared/dtos'

export class CreateCategoryUsecase implements Usecase<CategoryEntity> {
  constructor(
    private readonly repository: CategoryRepository,
    private readonly slugifier: Slugifier,
    private readonly mapper = new CreateCategoryMapper()
  ) {}

  async execute(data: CreateCategoryDto): Promise<CategoryEntity> {
    const payload = await this.preparePayload(data)
    return this.repository.create(payload)
  }

  private async preparePayload(
    data: CreateCategoryDto
  ): Promise<CategoryEntity> {
    const payload = this.mapper.mapFrom(data)
    const slug = this.slugifier.slugify(payload.name)
    const uniqueSlug = await this.getUniqueSlug(slug)
    return { ...payload, slug: uniqueSlug }
  }

  private async getUniqueSlug(slug: string, attempt = 0): Promise<string> {
    const uniqueSlug = attempt === 0 ? slug : `${slug}-${attempt}`
    const existingCategory = await this.repository.getCountBySlug(uniqueSlug)

    return !existingCategory
      ? uniqueSlug
      : this.getUniqueSlug(slug, attempt + 1)
  }
}
