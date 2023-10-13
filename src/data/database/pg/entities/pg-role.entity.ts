import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { PgUserEntity } from './pg-user.entity'

import { TableNames } from '@/data/database/pg/helpers'
import { Role, type RoleEntity } from '@/domain/entities'

@Entity({ name: TableNames.role })
export class PgRoleEntity implements RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: Role

  @Column()
  description: string

  @Column({ name: 'is_active' })
  isActive: boolean

  @ManyToMany(() => PgUserEntity, (user) => user.roles)
  users: PgUserEntity[]

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date
}
