import { DataSource, type DataSourceOptions } from 'typeorm'
import { type SeederOptions } from 'typeorm-extension'

import { config } from '@/infra'

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  synchronize: config.database.synchronize,
  entities: config.database.entities,
  migrations: config.database.migrations,
  seeds: config.database.seeds,
  factories: config.database.factories
}

export default new DataSource(dataSourceOptions)
