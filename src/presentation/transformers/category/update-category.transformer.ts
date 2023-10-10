import { CreateCategoryTransformer } from './create-category.transformer'

import { type CategoryEntity } from '@/domain/entities'
import { type CreateCategoryDto } from '@/shared/dtos'

export class UpdateCategoryTransformer {
  static mapFrom(data: CreateCategoryDto): CategoryEntity {
    return CreateCategoryTransformer.mapFrom(data)
  }
}
