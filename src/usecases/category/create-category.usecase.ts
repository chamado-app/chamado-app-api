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
    const payload = this.mapper.mapFrom(data)
    payload.slug = this.slugifier.slugify(payload.name)

    const categoriesWithSameSlug = await this.repository.getSlugSequence({
      slug: payload.slug
    })

    if (categoriesWithSameSlug) {
      payload.slug = `${payload.slug}-${categoriesWithSameSlug + 1}`
    }

    return await this.repository.create(payload)
  }
}
