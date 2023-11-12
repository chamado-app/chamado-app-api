import { type ModuleMetadata, type Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PgEquipmentEntity } from '@/data/database/pg/entities'
import {
  makeCreateEquipmentUsecaseProvider,
  makeDeleteEquipmentUsecaseProvider,
  makeEquipmentRepository,
  makeListEquipmentsUsecaseProvider,
  makeShowEquipmentUsecaseProvider,
  makeUpdateEquipmentUsecaseProvider
} from '@/main/factories'
import { EquipmentController } from '@/presentation/controllers'

export const makeEquipmentModuleMetadata = (): ModuleMetadata => {
  const database = TypeOrmModule.forFeature([PgEquipmentEntity])

  const providers: Provider[] = [
    makeEquipmentRepository(),
    makeCreateEquipmentUsecaseProvider(),
    makeShowEquipmentUsecaseProvider(),
    makeListEquipmentsUsecaseProvider(),
    makeUpdateEquipmentUsecaseProvider(),
    makeDeleteEquipmentUsecaseProvider()
  ]

  const imports = [database]
  const controllers = [EquipmentController]

  return { providers, imports, controllers }
}
