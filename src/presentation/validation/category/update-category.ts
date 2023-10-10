import { PartialType } from '@nestjs/mapped-types'

import { CreateCategoryValidated } from './create-category'

export class UpdateCategoryValidated extends PartialType(
  CreateCategoryValidated
) {}
