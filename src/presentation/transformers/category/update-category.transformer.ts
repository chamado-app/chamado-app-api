import { UpdateCategoryInputDto } from '@/domain/dtos'
import { type UpdateCategoryValidated } from '@/presentation/validation'

export class UpdateCategoryTransformer {
  static mapFrom(data: UpdateCategoryValidated): UpdateCategoryInputDto {
    return new UpdateCategoryInputDto(
      data.name,
      data.description,
      data.isActive
    )
  }
}
