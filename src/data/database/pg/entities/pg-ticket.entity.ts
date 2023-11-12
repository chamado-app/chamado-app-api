import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { TableNames } from '@/data/database/pg/helpers'
import { TicketStatus, type TicketEntity } from '@/domain/entities'

import { PgCategoryEntity } from './pg-category.entity'
import { PgEquipmentEntity } from './pg-equipment.entity'
import { PgTicketMessageEntity } from './pg-ticket-message.entity'
import { PgUserEntity } from './pg-user.entity'

@Entity({ name: TableNames.ticket })
export class PgTicketEntity implements TicketEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @OneToMany(() => PgTicketMessageEntity, (message) => message.ticket)
  messages: PgTicketMessageEntity[]

  @ManyToOne(() => PgCategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: PgCategoryEntity

  @ManyToOne(() => PgUserEntity)
  @JoinColumn({ name: 'reported_by_id' })
  reportedBy: PgUserEntity

  @ManyToOne(() => PgUserEntity, { nullable: true })
  @JoinColumn({ name: 'assigned_to_id' })
  assignedTo?: PgUserEntity

  @ManyToOne(() => PgEquipmentEntity, { nullable: true })
  @JoinColumn({ name: 'equipment_id' })
  equipment?: PgEquipmentEntity

  @Column({ type: 'enum', enum: TicketStatus })
  status: TicketStatus

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date
}
