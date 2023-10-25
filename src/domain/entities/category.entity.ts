import { Entity } from '@/domain/base'

export class CategoryEntity extends Entity {
  name: string
  slug: string
  description?: string | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
