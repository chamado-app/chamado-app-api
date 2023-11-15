import { type ModuleMetadata, type Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import {
  PgCategoryEntity,
  PgEquipmentEntity,
  PgTicketEntity,
  PgTicketMessageEntity,
  PgUserEntity
} from '@/data/database/pg/entities'
import {
  makeCategoryRepository,
  makeCreateTicketSystemMessageUsecaseProvider,
  makeCreateTicketTextMessageUsecaseProvider,
  makeCreateTicketUsecaseProvider,
  makeEquipmentRepository,
  makeListTicketsUsecaseProvider,
  makeShowTicketUsecaseProvider,
  makeTicketMessageRepository,
  makeTicketRepository,
  makeUpdateTicketAssignedUsecaseProvider,
  makeUpdateTicketStatusUsecaseProvider,
  makeUserRepository
} from '@/main/factories'
import { TicketController } from '@/presentation/controllers'

export const makeTicketModuleMetadata = (): ModuleMetadata => {
  const database = TypeOrmModule.forFeature([
    PgTicketEntity,
    PgTicketMessageEntity,
    PgCategoryEntity,
    PgEquipmentEntity,
    PgUserEntity
  ])

  const providers: Provider[] = [
    makeTicketRepository(),
    makeTicketMessageRepository(),
    makeEquipmentRepository(),
    makeCategoryRepository(),
    makeUserRepository(),
    makeShowTicketUsecaseProvider(),
    makeUpdateTicketStatusUsecaseProvider(),
    makeUpdateTicketAssignedUsecaseProvider(),
    makeListTicketsUsecaseProvider(),
    makeCreateTicketUsecaseProvider(),
    makeCreateTicketSystemMessageUsecaseProvider(),
    makeCreateTicketTextMessageUsecaseProvider()
  ]

  const imports = [database]
  const controllers = [TicketController]

  return { providers, imports, controllers }
}
