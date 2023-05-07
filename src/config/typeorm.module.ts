import { join } from 'path'

import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm'

const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'chamado-app.postgres',
  port: 5432,
  username: 'chamado.app',
  password: 'secret',
  database: 'chamado.app',
  entities: [join(__dirname, '../modules/**/**/*.entity{.ts,.js}')],
  synchronize: true,
  autoLoadEntities: true
}

export const TypeOrmHydratedModule = TypeOrmModule.forRoot(typeOrmModuleOptions)
