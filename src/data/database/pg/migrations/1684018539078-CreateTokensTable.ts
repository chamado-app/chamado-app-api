import { type MigrationInterface, type QueryRunner, Table } from 'typeorm'

import { createdAtField, primaryGeneratedColumnUuid } from '../typeorm/helpers'

export class CreateTokensTable1684018539078 implements MigrationInterface {
  private readonly tableName = 'tokens'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: this.tableName,
      columns: [
        primaryGeneratedColumnUuid(),
        { name: 'token', type: 'varchar', length: '80', isUnique: true },
        { name: 'type', type: 'varchar', length: '64' },
        { name: 'user_id', type: 'uuid' },
        createdAtField()
      ]
    })

    await queryRunner.createTable(table, true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName, true)
  }
}
