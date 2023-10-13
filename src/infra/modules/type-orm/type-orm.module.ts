import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { typeOrmDataSource } from './type-orm.config'

import { config } from '@/infra'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeOrmDataSource,
      autoLoadEntities: config.database.autoLoadEntities
    })
  ]
})
export class TypeOrmConfigModule {}
