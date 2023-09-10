import { Module } from '@nestjs/common'

import {
  EnvironmentConfigModule,
  JwtConfigModule,
  TypeOrmConfigModule
} from '@/infra'
import { AuthModule, CategoryModule } from '@/presentation/modules'

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
