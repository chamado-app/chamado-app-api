import { join } from 'path'

import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm'

import { config } from './config.module'

const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  synchronize: config.database.synchronize,
  autoLoadEntities: true,
  entities: [join(__dirname, '../modules/**/**/*.entity{.ts,.js}')]
}

export const TypeOrmHydratedModule = TypeOrmModule.forRoot(typeOrmModuleOptions)
