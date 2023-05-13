import { type Provider } from '@nestjs/common'
import { type Entity } from 'src/core/base/entity'
import { Providers } from 'src/main/enum/providers'
import config from 'src/shared/config'
import { DataSource, type EntityTarget } from 'typeorm'

export const makeDatabaseProviders = (): Provider[] => [
  {
    provide: Providers.database,
    useFactory: async () =>
      await new DataSource({ ...config.database }).initialize()
  }
]

export const makeRepositoryProvider = (
  provide: string,
  entity: EntityTarget<Entity>
): Provider => ({
  provide,
  inject: [Providers.database],
  useFactory: (dataSource: DataSource) => dataSource.getRepository(entity)
})
