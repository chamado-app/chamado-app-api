import { type MigrationInterface, type QueryRunner, Table } from 'typeorm'

import { TableNames, makeEntityColumns } from '@/data/database/pg/helpers'

export class CreateCategoryTable1694365804269 implements MigrationInterface {
  private readonly tableName = TableNames.category

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: this.tableName,
      columns: makeEntityColumns([
        { name: 'name', type: 'varchar', length: '60' },
        { name: 'slug', type: 'varchar', length: '60', isUnique: true },
        {
          name: 'description',
          type: 'varchar',
          isNullable: true,
          length: '120'
        },
        { name: 'parent_id', type: 'uuid', isNullable: true },
        { name: 'is_active', type: 'boolean', default: true }
      ]),
      foreignKeys: [
        {
          columnNames: ['parent_id'],
          referencedColumnNames: ['id'],
          referencedTableName: TableNames.category,
          onDelete: 'RESTRICT',
          name: 'children'
        }
      ]
    })

    await queryRunner.createTable(table, true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName, true)
  }
}
