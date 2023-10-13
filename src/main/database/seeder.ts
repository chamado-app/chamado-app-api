import { type ClassProvider } from '@nestjs/common'
import { type DataSource } from 'typeorm'
import { type Seeder, type SeederFactoryManager } from 'typeorm-extension'

import { RolesSeed, UsersSeed } from '@/data/database/pg/seeds'
import { type HashGenerator } from '@/domain/contracts'
import { makeHashGeneratorFactory } from '@/main/factories/adapters'

type Dependencies = {
  hashGenerator: HashGenerator
}

const makeDependencies = (): Dependencies => {
  const { useClass: HashGeneratorClass } =
    makeHashGeneratorFactory() as ClassProvider

  return { hashGenerator: new HashGeneratorClass() }
}

export default class SeedRunner implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const dependencies = makeDependencies()
    const seeds: Seeder[] = [
      new RolesSeed(),
      new UsersSeed(dependencies.hashGenerator)
    ]

    const run = async (seed: Seeder): Promise<void> => {
      console.info(`Running ${seed.constructor.name}`)

      await seed.run(dataSource, factoryManager)
    }

    for (const seed of seeds) await run(seed)
  }
}
