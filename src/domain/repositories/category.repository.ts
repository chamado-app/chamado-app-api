import { Repository } from '@/domain/base'
import { type CategoryEntity } from '@/domain/entities'

export abstract class CategoryRepository extends Repository<CategoryEntity> {
  abstract getSlugSequence(filter: Partial<CategoryEntity>): Promise<number>
}
