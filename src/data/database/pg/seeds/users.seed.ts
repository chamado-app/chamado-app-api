import { type DataSource, In } from 'typeorm'
import { type Seeder, type SeederFactoryManager } from 'typeorm-extension'

import { PgRoleEntity, PgUserEntity } from '@/data/database/pg/entities'
import { type HashGenerator } from '@/domain/contracts'
import { Role } from '@/domain/entities'

export class UsersSeed implements Seeder {
  constructor(private readonly hashGenerator: HashGenerator) {}

  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const factory = factoryManager.get(PgUserEntity)
    const userRepository = dataSource.getRepository(PgUserEntity)
    const roleRepository = dataSource.getRepository(PgRoleEntity)
    const roles = await roleRepository.find({
      where: { name: In([Role.MANAGER, Role.TECHNICIAN, Role.USER]) }
    })

    const users = await Promise.all(
      roles.map(async (role) => {
        const user = await factory.make()
        user.roles = [role]
        return user
      })
    )

    const usersWithHashedPassword = await Promise.all(
      users.map(async (user) => {
        const password = await this.hashGenerator.generate(user.password)
        return { ...user, password }
      })
    )

    await userRepository.save(usersWithHashedPassword)

    console.table(
      users.map(({ email, password, roles: [{ name: role }] }) => ({
        email,
        password,
        role
      }))
    )
  }
}
