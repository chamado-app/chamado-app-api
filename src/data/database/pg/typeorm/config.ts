import { join } from 'path'

import { DataSource } from 'typeorm'

import config from '../../../../shared/config'

export default new DataSource({
  ...config.database,
  migrations: [join(__dirname, '../migrations/*.{ts,js}')]
})
