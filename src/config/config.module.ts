import { ConfigModule } from '@nestjs/config'

import { type Config } from './types'

export const makeConfig = (): Config => ({
  database: {
    database: process.env.DB_DATABASE,
    debug:
      process.env.DB_DEBUG === 'true' || process.env.NODE_ENV !== 'production',
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    synchronize: process.env.DB_SYNCHRONIZE === 'true' || false,
    username: process.env.DB_USERNAME
  },
  port: parseInt(process.env.port, 10) || 3000
})

export const ConfigHydratedModule = ConfigModule.forRoot({
  load: [makeConfig]
})

export const config = makeConfig()
