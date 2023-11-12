import { type MigrationInterface, type QueryRunner, Table } from 'typeorm'

import { TicketMessageType } from '@/domain/entities'

import { TableNames, primaryGeneratedColumnUuid } from '../helpers'

export class CreateTicketMessageTable1699799499799
  implements MigrationInterface
{
  private readonly tableName = TableNames.ticketMessage

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: this.tableName,
      columns: [
        primaryGeneratedColumnUuid(),
        { name: 'text', type: 'varchar', length: '1024' },
        { name: 'url', type: 'varchar', length: '512', isNullable: true },
        { name: 'type', type: 'enum', enum: Object.values(TicketMessageType) },
        { name: 'ticket_id', type: 'uuid' },
        { name: 'sent_by_id', type: 'uuid' },
        { name: 'sent_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP(6)' },
        { name: 'read_at', type: 'timestamp', isNullable: true }
      ],
      foreignKeys: [
        {
          columnNames: ['ticket_id'],
          referencedColumnNames: ['id'],
          referencedTableName: TableNames.ticket
        },
        {
          columnNames: ['sent_by_id'],
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
