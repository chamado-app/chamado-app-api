import { type DataSource } from 'typeorm'
import {
  type Seeder,
  type SeederConstructor,
  type SeederFactoryManager
} from 'typeorm-extension'

import { RolesSeed, UsersSeed } from '@/data/database/pg/seeds'

export default class SeedRunner implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const seeds: SeederConstructor[] = [RolesSeed, UsersSeed]

    for (const Seed of seeds) {
      await new Seed().run(dataSource, factoryManager)
    }
  }
}
