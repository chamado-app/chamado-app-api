import { DataSource, type DataSourceOptions } from 'typeorm'

import { config } from '@/infra'

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  synchronize: config.database.synchronize,
  entities: config.database.entities,
  migrations: config.database.migrations
}

export default new DataSource(dataSourceOptions)
