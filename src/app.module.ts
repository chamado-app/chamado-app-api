import { Module } from '@nestjs/common'

import { TypeOrmHydratedModule } from './config'

@Module({
  imports: [TypeOrmHydratedModule],
  controllers: [],
  providers: []
})
export class AppModule {}
