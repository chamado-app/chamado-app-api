import { type DataSource } from 'typeorm'
import { type Seeder } from 'typeorm-extension'

import { PgRoleEntity } from '@/data/database/pg/entities'
import { Role } from '@/domain/entities'

export class RolesSeed implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(PgRoleEntity)
    const roles: Array<Partial<PgRoleEntity>> = [
      { name: Role.USER, description: 'Usuário padrão do sistema' },
      { name: Role.TECHNICIAN, description: 'Técnico de TI' },
      {
        name: Role.MANAGER,
        description: 'Gerente de TI e administrador do sistema'
      },
      { name: Role.GUEST, description: 'Usuário não logado no sistema' }
    ]

    await repository.save(roles)
  }
}
