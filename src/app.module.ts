import { Module } from '@nestjs/common'

import { TypeOrmHydratedModule } from './config'
import { ConfigHydratedModule } from './config/config.module'
import { UsersModule } from './modules'
@Module({
  imports: [TypeOrmHydratedModule, ConfigHydratedModule, UsersModule],
  controllers: [],
  providers: []
})
export class AppModule {}
