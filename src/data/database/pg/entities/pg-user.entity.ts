import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { PgTokenEntity } from './pg-token.entity'

import { TableNames } from '@/data/database/pg/helpers'
import { type UserEntity } from '@/domain/entities'

@Entity({ name: TableNames.user })
export class PgUserEntity implements UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({ name: 'first_name' })
  firstName: string

  @Column({ name: 'last_name' })
  lastName: string

  @Column({ default: true, name: 'is_active' })
  isActive: boolean

  @OneToMany(() => PgTokenEntity, (token) => token.user)
  tokens?: PgTokenEntity[]

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date
}
