import { resolve } from 'path'

import { app } from './app'

export const database = {
  type: 'postgres' as const,
  database: process.env.DB_DATABASE,
  debug: process.env.DB_DEBUG === 'true' || app.isProduction,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  synchronize: process.env.DB_SYNCHRONIZE === 'true' || false,
  username: process.env.DB_USERNAME,
  entities: [
    resolve(__dirname, '../../data/database/pg/entities/*.entity.{t,j}s')
  ]
}
