import { CreateCategoryTransformer } from './create-category.transformer'

import { type CategoryEntity } from '@/domain/entities'
import {
  type CreateCategoryValidated,
  type UpdateCategoryValidated
} from '@/presentation/validation'

export class UpdateCategoryTransformer {
  static mapFrom(data: UpdateCategoryValidated): CategoryEntity {
    return CreateCategoryTransformer.mapFrom(data as CreateCategoryValidated)
  }
}
