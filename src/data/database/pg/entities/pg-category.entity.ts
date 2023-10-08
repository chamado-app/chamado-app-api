import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn
} from 'typeorm'

import { TableNames } from '@/data/database/pg/helpers'
import { type CategoryEntity } from '@/domain/entities'

@Entity({ name: TableNames.category })
@Tree('closure-table', {
  ancestorColumnName: () => 'parent_id',
  descendantColumnName: () => 'child_id'
})
export class PgCategoryEntity implements CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  slug: string

  @Column()
  description?: string

  @TreeParent()
  @JoinColumn({ name: 'parent_id' })
  parent?: PgCategoryEntity

  @TreeChildren()
  children: PgCategoryEntity[]

  @Column({ name: 'is_active' })
  isActive: boolean

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date
}
