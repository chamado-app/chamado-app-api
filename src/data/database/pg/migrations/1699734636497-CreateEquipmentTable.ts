import { type MigrationInterface, type QueryRunner, Table } from 'typeorm'

import { TableNames, makeEntityColumns } from '@/data/database/pg/helpers'
import { EquipmentStatus } from '@/domain/entities'

export class CreateEquipmentTable1699734636497 implements MigrationInterface {
  private readonly tableName = TableNames.equipment

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: this.tableName,
      columns: makeEntityColumns([
        { name: 'name', type: 'varchar', length: '80' },
        { name: 'brand', type: 'varchar', length: '80' },
        { name: 'model', type: 'varchar', length: '80' },
        { name: 'type', type: 'varchar', length: '60' },
        { name: 'section', type: 'varchar', length: '60' },
        { name: 'serial', type: 'varchar', length: '40' },
        { name: 'patrimony', type: 'varchar', length: '40' },
        { name: 'additionalInfo', type: 'varchar', length: '255' },
        { name: 'status', type: 'enum', enum: Object.values(EquipmentStatus) }
      ])
    })

    await queryRunner.createTable(table, true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName, true)
  }
}
