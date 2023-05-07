import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'created_at'
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    name: 'updated_at'
  })
  updatedAt: Date
}
