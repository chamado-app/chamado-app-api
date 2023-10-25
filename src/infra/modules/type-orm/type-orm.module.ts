import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { config } from '@/infra'

import { typeOrmDataSource } from './type-orm.config'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeOrmDataSource,
      autoLoadEntities: config.database.autoLoadEntities
    })
  ]
})
export class TypeOrmConfigModule {}
