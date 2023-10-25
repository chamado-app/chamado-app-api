import { join } from 'path'

import { app } from './app.config'

export const database = {
  type: 'postgres' as const,
  database: process.env.DB_DATABASE,
  debug: process.env.DB_DEBUG === 'true' || app.isProduction,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  synchronize: process.env.DB_SYNCHRONIZE === 'true' || false,
  username: process.env.DB_USERNAME,
  entities: [
    join(__dirname, '../../data/database/pg/entities/*.entity.{t,j}s')
  ],
  migrations: [join(__dirname, '../../data/database/pg/migrations/*.{t,j}s')],
  seeds: [join(__dirname, '../../main/database/seeder.js')],
  factories: [join(__dirname, '../../data/database/pg/factories/*.js')],
  autoLoadEntities: true
}
