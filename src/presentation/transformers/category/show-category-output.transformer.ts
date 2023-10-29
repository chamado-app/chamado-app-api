import { type CategoryEntity } from '@/domain/entities'
import { ShowCategoryDto } from '@/presentation/resources'

export class ShowCategoryTransformer {
  static mapTo(entity: CategoryEntity): ShowCategoryDto {
    return new ShowCategoryDto(
      entity.id,
      entity.name,
      entity.slug,
      entity.description ?? null,
      entity.isActive,
      entity.createdAt,
      entity.updatedAt
    )
  }
}
