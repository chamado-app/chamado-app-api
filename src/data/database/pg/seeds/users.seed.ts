import { type DataSource } from 'typeorm'
import { type Seeder, type SeederFactoryManager } from 'typeorm-extension'

import { PgUserEntity } from '../entities'

import { makePureHashGeneratorFactory } from '@/main/factories/adapters'

const hasher = makePureHashGeneratorFactory()
export default class UsersSeed implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const factory = factoryManager.get(PgUserEntity)
    const repository = dataSource.getRepository(PgUserEntity)
    const { email, password, ...user } = await factory.make()
    const hashedPassword = await hasher.generate(password)

    await repository.save({ ...user, email, password: hashedPassword })
    console.table({ email, password })
  }
}
