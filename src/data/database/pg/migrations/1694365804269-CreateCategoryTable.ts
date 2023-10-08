import { type MigrationInterface, type QueryRunner, Table } from 'typeorm'

import { TableNames, makeEntityColumns } from '@/data/database/pg/helpers'

export class CreateCategoryTable1694365804269 implements MigrationInterface {
  private readonly tableName = TableNames.category
  private readonly tableClosureName = TableNames.categoriesClosure

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
          onDelete: 'RESTRICT'
        }
      ]
    })

    const closureTable = new Table({
      name: this.tableClosureName,
      columns: [
        { name: 'parent_id', type: 'uuid', isPrimary: true, isNullable: false },
        { name: 'child_id', type: 'uuid', isPrimary: true, isNullable: false }
      ],
      foreignKeys: [
        {
          columnNames: ['parent_id'],
          referencedColumnNames: ['id'],
          referencedTableName: TableNames.category,
          onDelete: 'RESTRICT'
        },
        {
          columnNames: ['child_id'],
          referencedColumnNames: ['id'],
          referencedTableName: TableNames.category,
          onDelete: 'RESTRICT'
        }
      ]
    })

    await queryRunner.createTable(table, true)
    await queryRunner.createTable(closureTable, true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableClosureName, true)
    await queryRunner.dropTable(this.tableName, true)
  }
}
