import { type Provider } from '@nestjs/common'
import { DataSource, type EntityTarget } from 'typeorm'

import { Providers, type RepositoryProvider } from '@/data/enum'
import { type Entity } from '@/domain/base'
import config from '@/infra/config'

export const makeDatabaseProviders = (): Provider[] => [
  {
    provide: Providers.database,
    useFactory: async () =>
      await new DataSource({ ...config.database }).initialize()
  }
]

export const makeTypeormRepositoryProvider = (
  provide: RepositoryProvider,
  entity: EntityTarget<Entity>
): Provider => ({
  provide,
  inject: [Providers.database],
  useFactory: (dataSource: DataSource) => dataSource.getRepository(entity)
})
