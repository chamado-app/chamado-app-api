import { type MigrationInterface, type QueryRunner, Table } from 'typeorm'

import { TableNames, makeEntityColumns } from '@/data/database/pg/helpers'

export class CreateUsersTable1683494331204 implements MigrationInterface {
  private readonly tableName = TableNames.user

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: this.tableName,
      columns: makeEntityColumns([
        { name: 'email', type: 'varchar', length: '80', isUnique: true },
        { name: 'password', type: 'varchar', length: '64' },
        { name: 'first_name', type: 'varchar', length: '60' },
        { name: 'last_name', type: 'varchar', length: '60' },
        { name: 'is_active', type: 'boolean', default: true }
      ])
    })

    await queryRunner.createTable(table, true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName, true)
  }
}
