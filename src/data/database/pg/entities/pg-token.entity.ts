import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

import { TableNames } from '@/data/database/pg/helpers'
import { type TokenEntity, TokenType } from '@/domain/entities'

import { PgUserEntity } from './pg-user.entity'

@Entity({ name: TableNames.token })
export class PgTokenEntity implements TokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  token: string

  @Column({ enum: TokenType })
  type: TokenType

  @ManyToOne(() => PgUserEntity, (user) => user.tokens)
  @JoinColumn({ name: 'user_id' })
  user: PgUserEntity

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date
}
