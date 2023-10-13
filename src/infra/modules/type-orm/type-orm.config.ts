import { type DataSourceOptions } from 'typeorm'

import { config } from '@/infra'

export const typeOrmDataSource: DataSourceOptions = {
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  synchronize: config.database.synchronize,
  entities: config.database.entities
}
