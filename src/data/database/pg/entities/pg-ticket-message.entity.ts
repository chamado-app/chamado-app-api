import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

import { TableNames } from '@/data/database/pg/helpers'
import {
  TicketMessageDataEntity,
  type TicketMessageEntity
} from '@/domain/entities'

import { PgTicketMessageDataEntity } from './pg-ticket-message-data.entity'
import { PgTicketEntity } from './pg-ticket.entity'
import { PgUserEntity } from './pg-user.entity'

@Entity({ name: TableNames.ticketMessage })
export class PgTicketMessageEntity implements TicketMessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => TicketMessageDataEntity)
  @JoinColumn({ name: 'ticket_message_data_id' })
  data: PgTicketMessageDataEntity

  @ManyToOne(() => PgTicketEntity)
  @JoinColumn({ name: 'ticket_id' })
  ticket: PgTicketEntity

  @ManyToOne(() => PgUserEntity)
  @JoinColumn({ name: 'sent_by_id' })
  sentBy: PgUserEntity

  @CreateDateColumn({ type: 'timestamp', name: 'sent_at' })
  sentAt: Date

  @Column({ type: 'timestamp', name: 'read_at', nullable: true })
  readAt?: Date
}
