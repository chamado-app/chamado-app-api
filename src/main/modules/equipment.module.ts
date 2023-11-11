import { Module } from '@nestjs/common'

import { makeEquipmentModuleMetadata } from '@/main/factories'

@Module(makeEquipmentModuleMetadata())
export class EquipmentModule {}
