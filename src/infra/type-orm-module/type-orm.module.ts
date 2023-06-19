import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { dataSourceOptions } from './type-orm.config'

import { config } from '@/infra'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: config.database.autoLoadEntities
    })
  ]
})
export class TypeOrmConfigModule {}
