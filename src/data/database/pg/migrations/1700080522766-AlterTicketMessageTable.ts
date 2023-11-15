import { TableColumn, type MigrationInterface, type QueryRunner } from 'typeorm'

import { TableNames } from '../helpers'

export class AlterTicketMessageTable1700080522766
  implements MigrationInterface
{
  private readonly tableName = TableNames.ticketMessage
  private readonly column = 'sent_by_id'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const newColumn = new TableColumn({
      name: this.column,
      type: 'uuid',
      isNullable: true
    })

    await queryRunner.changeColumn(this.tableName, this.column, newColumn)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const oldColumn = new TableColumn({
      name: this.column,
      type: 'uuid',
      isNullable: false
    })

    await queryRunner.changeColumn(this.tableName, this.column, oldColumn)
  }
}
