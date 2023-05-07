import { Module } from '@nestjs/common'

import { TypeOrmHydratedModule } from './config'
import { ConfigHydratedModule } from './config/config.module'

@Module({
  imports: [TypeOrmHydratedModule, ConfigHydratedModule],
  controllers: [],
  providers: []
})
export class AppModule {}
