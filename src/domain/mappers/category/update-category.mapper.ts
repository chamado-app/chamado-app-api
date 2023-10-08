import { CreateCategoryMapper } from './create-category.mapper'

import { Mapper } from '@/domain/base'
import { type CategoryEntity } from '@/domain/entities'
import { type CreateCategoryDto, type UpdateCategoryDto } from '@/shared/dtos'

export class UpdateCategoryMapper extends Mapper<
  UpdateCategoryDto,
  CategoryEntity
> {
  mapFrom(data: UpdateCategoryDto): CategoryEntity {
    const createCategoryMapper = new CreateCategoryMapper()
    return createCategoryMapper.mapFrom(data as CreateCategoryDto)
  }

  mapTo(category: CategoryEntity): UpdateCategoryDto {
    const createCategoryMapper = new CreateCategoryMapper()
    return createCategoryMapper.mapTo(category)
  }
}
