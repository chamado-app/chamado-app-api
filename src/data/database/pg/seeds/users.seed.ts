import { type DataSource } from 'typeorm'
import { type Seeder, type SeederFactoryManager } from 'typeorm-extension'

import { PgRoleEntity, PgUserEntity } from '@/data/database/pg/entities'
import { Role } from '@/domain/entities'

export default class UsersSeed implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const factory = factoryManager.get(PgUserEntity)
    const repository = dataSource.getRepository(PgUserEntity)
    const roleRepository = dataSource.getRepository(PgRoleEntity)
    const { email, password, ...user } = await factory.make()
    user.roles = await roleRepository.find({ where: { name: Role.MANAGER } })

    await repository.save({ ...user, email, password })
    console.table({ email, password: 'chamado' })
  }
}
