import { Entity } from '@/domain/base'

export class CategoryEntity extends Entity {
  name: string
  slug: string
  description?: string
  parent?: CategoryEntity
  children: CategoryEntity[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
