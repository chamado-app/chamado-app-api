import { type ModuleMetadata, type Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PgCategoryEntity } from '@/data/database/pg/entities'
import {
  makeCategoryRepository,
  makeCreateCategoryUsecaseProvider,
  makeDeleteCategoryUsecaseProvider,
  makeListCategoriesUsecaseProvider,
  makeSlugifier,
  makeUpdateCategoryUsecaseProvider
} from '@/main/factories'
import { CategoryController } from '@/presentation/controllers'

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