import { type ModuleMetadata, type Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import {
  PgCategoryEntity,
  PgEquipmentEntity,
  PgTicketEntity
} from '@/data/database/pg/entities'
import {
  makeCategoryRepository,
  makeCreateTicketUsecaseProvider,
  makeEquipmentRepository,
  makeTicketRepository
} from '@/main/factories'
import { TicketController } from '@/presentation/controllers'

export const makeTicketModuleMetadata = (): ModuleMetadata => {
  const database = TypeOrmModule.forFeature([
    PgTicketEntity,
    PgCategoryEntity,
    PgEquipmentEntity
  ])

  const providers: Provider[] = [
    makeTicketRepository(),
    makeCategoryRepository(),
    makeEquipmentRepository(),
    makeCreateTicketUsecaseProvider()
  ]

  const imports = [database]
  const controllers = [TicketController]

  return { providers, imports, controllers }
}
