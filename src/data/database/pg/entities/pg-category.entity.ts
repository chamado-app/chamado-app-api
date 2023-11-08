import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { TableNames } from '@/data/database/pg/helpers'
import { type CategoryEntity } from '@/domain/entities'

import { PgUserEntity } from './pg-user.entity'

@Entity({ name: TableNames.category })
export class PgCategoryEntity implements CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  slug: string

  @Column()
  description?: string

  @Column({ name: 'is_active' })
  isActive: boolean

  @ManyToMany(() => PgUserEntity, (user) => user.sectors)
  users: PgUserEntity[]

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date
}
