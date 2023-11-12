import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { TableNames } from '@/data/database/pg/helpers'
import {
  TicketMessageType,
  type TicketMessageDataEntity
} from '@/domain/entities'

@Entity({ name: TableNames.ticketMessageData })
export class PgTicketMessageDataEntity implements TicketMessageDataEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  text: string

  @Column({ nullable: true })
  url?: string

  @Column({ enum: TicketMessageType })
  type: TicketMessageType
}
