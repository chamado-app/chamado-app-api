import { Module } from '@nestjs/common'

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
  ]
})
export class AppModule {}
