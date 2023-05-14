import { type MigrationInterface, type QueryRunner, Table } from 'typeorm'

import {
  TableNames,
  createdAtField,
  primaryGeneratedColumnUuid
} from '@/data/database/pg/helpers'
import { TokenType } from '@/domain/entities'

export class CreateTokensTable1684018539078 implements MigrationInterface {
  private readonly tableName = TableNames.token

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: this.tableName,
      columns: [
        primaryGeneratedColumnUuid(),
        { name: 'token', type: 'varchar', isUnique: true },
        { name: 'type', type: 'enum', enum: Object.values(TokenType) },
        { name: 'user_id', type: 'uuid' },
        createdAtField()
      ],
      foreignKeys: [
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
