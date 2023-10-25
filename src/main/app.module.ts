import { Module } from '@nestjs/common'

import {
  EnvironmentConfigModule,
  JwtConfigModule,
  TypeOrmConfigModule
} from '@/infra'
import { AuthModule, CategoryModule, UserModule } from '@/main/modules'

import { providers } from './providers'

@Module({
  imports: [
    EnvironmentConfigModule,
    JwtConfigModule,
    TypeOrmConfigModule,
    AuthModule,
    UserModule,
    CategoryModule
  ],
  providers
})
export class AppModule {}
