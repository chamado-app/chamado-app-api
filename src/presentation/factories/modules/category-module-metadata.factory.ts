import { type ModuleMetadata, type Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PgCategoryEntity } from '@/data/database/pg/entities'
import { CategoryController } from '@/presentation/controllers'
import {
  makeCategoryRepository,
  makeCreateCategoryUsecaseProvider,
  makeDeleteCategoryUsecaseProvider,
  makeListCategoriesUsecaseProvider,
  makeSlugifier,
  makeUpdateCategoryUsecaseProvider
} from '@/presentation/factories'

export const makeCategoryModuleMetadata = (): ModuleMetadata => {
  const database = TypeOrmModule.forFeature([PgCategoryEntity])
  const providers: Provider[] = [
    makeCategoryRepository(),
    makeSlugifier(),
    makeCreateCategoryUsecaseProvider(),
    makeUpdateCategoryUsecaseProvider(),
    makeListCategoriesUsecaseProvider(),
    makeDeleteCategoryUsecaseProvider()
  ]
  const imports = [database]
  const controllers = [CategoryController]

  return { providers, imports, controllers }
}
