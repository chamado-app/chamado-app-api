import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { TableNames } from '@/data/database/pg/helpers'
import { EquipmentStatus, type EquipmentEntity } from '@/domain/entities'

import { PgTicketEntity } from './pg-ticket.entity'

@Entity({ name: TableNames.equipment })
export class PgEquipmentEntity implements EquipmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  brand: string

  @Column()
  model: string

  @Column()
  type: string

  @Column()
  section: string

  @Column({ nullable: true })
  serial?: string

  @Column({ nullable: true })
  patrimony?: string

  @Column({ nullable: true })
  additionalInfo?: string

  @OneToMany(() => PgTicketEntity, (ticket) => ticket.equipment)
  tickets?: PgTicketEntity[]

  @Column({ nullable: true, enum: EquipmentStatus })
  status: EquipmentStatus

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date
}
