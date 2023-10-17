import { CreateCategoryInputDto } from '@/domain/dtos'
import { type CreateCategoryValidated } from '@/presentation/validation'

export class CreateCategoryTransformer {
  static mapFrom(data: CreateCategoryValidated): CreateCategoryInputDto {
    return new CreateCategoryInputDto(
      data.name,
      data.isActive,
      data.description
    )
  }
}
