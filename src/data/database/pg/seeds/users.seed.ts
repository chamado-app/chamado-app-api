import { type DataSource } from 'typeorm'
import { type Seeder, type SeederFactoryManager } from 'typeorm-extension'

import { PgUserEntity } from '../entities'

export default class UsersSeed implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const factory = factoryManager.get(PgUserEntity)
    const repository = dataSource.getRepository(PgUserEntity)
    const { email, password, ...user } = await factory.make()

    await repository.save({ ...user, email, password })
    console.table({ email, password: 'chamado' })
  }
}
