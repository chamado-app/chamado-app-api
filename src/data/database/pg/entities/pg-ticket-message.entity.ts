import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

import { TableNames } from '@/data/database/pg/helpers'
import { TicketMessageType, type TicketMessageEntity } from '@/domain/entities'

import { PgTicketEntity } from './pg-ticket.entity'
import { PgUserEntity } from './pg-user.entity'

@Entity({ name: TableNames.ticketMessage })
export class PgTicketMessageEntity implements TicketMessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  text: string

  @Column({ nullable: true })
  url?: string

  @Column({ enum: TicketMessageType })
  type: TicketMessageType

  @ManyToOne(() => PgTicketEntity)
  @JoinColumn({ name: 'ticket_id' })
  ticket: PgTicketEntity

  @ManyToOne(() => PgUserEntity, { eager: true })
  @JoinColumn({ name: 'sent_by_id' })
  sentBy: PgUserEntity

  @CreateDateColumn({ type: 'timestamp', name: 'sent_at' })
  sentAt: Date

  @Column({ type: 'timestamp', name: 'read_at', nullable: true })
  readAt?: Date
}
