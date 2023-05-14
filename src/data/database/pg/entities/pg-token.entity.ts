import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

import { PgUserEntity } from './pg-user.entity'

import { type TokenEntity } from '@/domain/entities'

@Entity({ name: 'tokens' })
export class PgTokenEntity implements TokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  token: string

  @Column()
  type: string

  @ManyToOne(() => PgUserEntity, (user) => user.tokens)
  @JoinColumn({ name: 'user_id' })
  user: PgUserEntity

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'created_at'
  })
  createdAt: Date
}