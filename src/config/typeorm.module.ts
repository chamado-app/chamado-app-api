import { join } from 'path'

import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DataSource, type DataSourceOptions } from 'typeorm'

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
  migrations: [join(__dirname, '../database/migrations/*.{ts,js}')],
  entities: [join(__dirname, '../modules/**/**/*.entity.{ts,js}')]
}

export const TypeOrmHydratedModule = TypeOrmModule.forRoot(typeOrmModuleOptions)

export default new DataSource(typeOrmModuleOptions as DataSourceOptions)
