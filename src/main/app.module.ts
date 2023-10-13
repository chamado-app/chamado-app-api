import { Module } from '@nestjs/common'

import { providers } from './providers'

import {
  EnvironmentConfigModule,
  JwtConfigModule,
  TypeOrmConfigModule
} from '@/infra'
import { AuthModule, CategoryModule } from '@/main/modules'

@Module({
  imports: [
    EnvironmentConfigModule,
    JwtConfigModule,
    TypeOrmConfigModule,
    AuthModule,
    CategoryModule
  ],
  providers
})
export class AppModule {}
