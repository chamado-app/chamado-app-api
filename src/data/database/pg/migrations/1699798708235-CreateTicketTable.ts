import { type MigrationInterface, type QueryRunner, Table } from 'typeorm'

import { TableNames, makeEntityColumns } from '@/data/database/pg/helpers'
import { TicketStatus } from '@/domain/entities'

export class CreateTicketTable1699798708235 implements MigrationInterface {
  private readonly tableName = TableNames.ticket
  private readonly useSoftDeletes = false

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: this.tableName,
      columns: makeEntityColumns(
        [
          { name: 'title', type: 'varchar', length: '120' },
          { name: 'status', type: 'enum', enum: Object.values(TicketStatus) },
          { name: 'category_id', type: 'uuid' },
          { name: 'reported_by_id', type: 'uuid' },
          { name: 'assigned_to_id', type: 'uuid', isNullable: true },
          { name: 'equipment_id', type: 'uuid', isNullable: true }
        ],
        this.useSoftDeletes
      ),
      foreignKeys: [
        {
          columnNames: ['category_id'],
          referencedColumnNames: ['id'],
          referencedTableName: TableNames.category
        },
        {
          columnNames: ['reported_by_id'],
          referencedColumnNames: ['id'],
          referencedTableName: TableNames.user
        },
        {
          columnNames: ['assigned_to_id'],
          referencedColumnNames: ['id'],
          referencedTableName: TableNames.user
        },
        {
          columnNames: ['equipment_id'],
          referencedColumnNames: ['id'],
          referencedTableName: TableNames.equipment
        }
      ]
    })

    await queryRunner.createTable(table, true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName, true)
  }
}
