import { Repository } from '@/domain/base'
import { type CategoryEntity } from '@/domain/entities'

export abstract class CategoryRepository extends Repository<CategoryEntity> {
  abstract getCountBySlug(slug: string, id?: string): Promise<number>
}
