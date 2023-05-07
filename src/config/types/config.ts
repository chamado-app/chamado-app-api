type DatabaseConfig = {
  database: string
  debug: boolean
  host: string
  password: string
  port: number
  synchronize: boolean
  username: string
}

export type Config = {
  database: DatabaseConfig
  port: number
}
