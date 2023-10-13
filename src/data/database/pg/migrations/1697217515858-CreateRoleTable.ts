import { type MigrationInterface, type QueryRunner, Table } from 'typeorm'

import { TableNames, makeEntityColumns } from '@/data/database/pg/helpers'
import { Role } from '@/domain/entities'

export class CreateRoleTable1697217515858 implements MigrationInterface {
  private readonly tableName = TableNames.role

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: this.tableName,
      columns: makeEntityColumns([
        {
          name: 'name',
          type: 'enum',
          isUnique: true,
          enum: Object.values(Role)
        },
        {
          name: 'description',
          type: 'varchar',
          isNullable: true,
          length: '120'
        },
        { name: 'is_active', type: 'boolean', default: true }
      ])
    })

    await queryRunner.createTable(table, true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName, true)
  }
}
