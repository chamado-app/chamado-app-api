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
import { type CategoryEntity } from '@/domain/entities'

@Entity({ name: TableNames.category })
export class PgCategoryEntity implements CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description?: string

  @ManyToOne(() => PgCategoryEntity, (category) => category.children)
  @JoinColumn({ name: 'parent_id' })
  parent?: PgCategoryEntity

  @OneToMany(() => PgCategoryEntity, (category) => category.parent)
  children: PgCategoryEntity[]

  @Column({ name: 'is_active' })
  isActive: boolean

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date
}
