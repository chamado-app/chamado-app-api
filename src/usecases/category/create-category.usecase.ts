import { type Observable } from 'rxjs'

import { type Usecase } from '@/domain/base'
import { type CategoryEntity } from '@/domain/entities'
import { CreateCategoryMapper } from '@/domain/mappers'
import { type CategoryRepository } from '@/domain/repositories'
import { type CreateCategoryDto } from '@/shared/dtos'

export class CreateCategoryUsecase implements Usecase<CategoryEntity> {
  constructor(
    private readonly repository: CategoryRepository,
    private readonly mapper = new CreateCategoryMapper()
  ) {}

  execute(data: CreateCategoryDto): Observable<CategoryEntity> {
    const payload = this.mapper.mapFrom(data)

    return this.repository.create(payload)
  }
}
