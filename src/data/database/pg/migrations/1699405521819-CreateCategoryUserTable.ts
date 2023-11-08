import { Table, type MigrationInterface, type QueryRunner } from 'typeorm'

import { TableNames } from '../helpers'

export class CreateCategoryUserTable1699405521819
  implements MigrationInterface
{
  private readonly tableName = TableNames.categoryUser

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: this.tableName,
      columns: [
        { name: 'section_id', type: 'uuid' },
        { name: 'user_id', type: 'uuid' }
      ],
      foreignKeys: [
        {
          columnNames: ['section_id'],
          referencedColumnNames: ['id'],
          referencedTableName: TableNames.category
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
