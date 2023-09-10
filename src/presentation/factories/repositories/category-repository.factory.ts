import { type Provider } from '@nestjs/common'

import { PgCategoryRepository } from '@/data/database/pg/repositories'
import { CategoryRepository } from '@/domain/repositories'

export const makeCategoryRepository = (): Provider => ({
  provide: CategoryRepository,
  useClass: PgCategoryRepository
})
