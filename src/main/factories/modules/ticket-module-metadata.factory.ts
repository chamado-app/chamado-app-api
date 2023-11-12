import { type ModuleMetadata, type Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import {
  PgCategoryEntity,
  PgEquipmentEntity,
  PgTicketEntity,
  PgTicketMessageEntity
} from '@/data/database/pg/entities'
import {
  makeCategoryRepository,
  makeCreateTicketTextMessageUsecaseProvider,
  makeCreateTicketUsecaseProvider,
  makeEquipmentRepository,
  makeShowTicketUsecaseProvider,
  makeTicketMessageRepository,
  makeTicketRepository
} from '@/main/factories'
import { TicketController } from '@/presentation/controllers'

export const makeTicketModuleMetadata = (): ModuleMetadata => {
  const database = TypeOrmModule.forFeature([
    PgTicketEntity,
    PgTicketMessageEntity,
    PgCategoryEntity,
    PgEquipmentEntity
  ])

  const providers: Provider[] = [
    makeTicketRepository(),
    makeTicketMessageRepository(),
    makeEquipmentRepository(),
    makeCategoryRepository(),
    makeShowTicketUsecaseProvider(),
    makeCreateTicketUsecaseProvider(),
    makeCreateTicketTextMessageUsecaseProvider()
  ]

  const imports = [database]
  const controllers = [TicketController]

  return { providers, imports, controllers }
}
