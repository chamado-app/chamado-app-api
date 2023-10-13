import { DataSource, type DataSourceOptions } from 'typeorm'
import { type SeederOptions } from 'typeorm-extension'

import { config } from '@/infra/config'
import { typeOrmDataSource } from '@/infra/modules/type-orm/type-orm.config'

const seederOptions: DataSourceOptions & SeederOptions = {
  ...typeOrmDataSource,
  migrations: config.database.migrations,
  seeds: config.database.seeds,
  factories: config.database.factories
}

export default new DataSource(seederOptions)
