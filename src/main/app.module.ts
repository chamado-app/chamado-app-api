import { Module } from '@nestjs/common'

import {
  EnvironmentConfigModule,
  JwtConfigModule,
  TypeOrmConfigModule
} from '@/infra'
import {
  AuthModule,
  CategoryModule,
  EquipmentModule,
  TicketModule,
  UserModule
} from '@/main/modules'

import { providers } from './providers'

@Module({
  imports: [
    // Config modules
    EnvironmentConfigModule,
    JwtConfigModule,
    TypeOrmConfigModule,

    // Functional modules
    AuthModule,
    CategoryModule,
    EquipmentModule,
    TicketModule,
    UserModule
  ],
  providers
})
export class AppModule {}
