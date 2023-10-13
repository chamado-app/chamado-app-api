import { type MigrationInterface, type QueryRunner, Table } from 'typeorm'

import { TableNames } from '@/data/database/pg/helpers'

export class CreateRoleUserTable1697217528925 implements MigrationInterface {
  private readonly tableName = TableNames.roleUser

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: this.tableName,
      columns: [
        { name: 'role_id', type: 'uuid' },
        { name: 'user_id', type: 'uuid' }
      ],
      foreignKeys: [
        {
          columnNames: ['role_id'],
          referencedColumnNames: ['id'],
          referencedTableName: TableNames.role
        },
        {
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: TableNames.user
        }
      ]
    })

    await queryRunner.createTable(table, true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName, true)
  }
}
