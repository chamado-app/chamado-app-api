import { type Observable, map, switchMap } from 'rxjs'

import { type Usecase } from '@/domain/base'
import { type Slugifier } from '@/domain/contracts'
import { type CategoryEntity } from '@/domain/entities'
import { CreateCategoryMapper } from '@/domain/mappers'
import { type CategoryRepository } from '@/domain/repositories'
import { type CreateCategoryDto } from '@/shared/dtos'

export class CreateCategoryUsecase implements Usecase<CategoryEntity> {
  constructor(
    private readonly repository: CategoryRepository,
    private readonly slugifier: Slugifier,
    private readonly mapper = new CreateCategoryMapper()
  ) {}

  execute(data: CreateCategoryDto): Observable<CategoryEntity> {
    const payload = this.mapper.mapFrom(data)
    payload.slug = this.slugifier.slugify(payload.name)

    return this.repository
      .getMany({ slug: payload.slug })
      .pipe(
        map((result) => {
          if (!result.length) return
          const slugBase = `${payload.slug}-${result.length + 1}`
          payload.slug = this.slugifier.slugify(slugBase)
        })
      )
      .pipe(switchMap(() => this.repository.create(payload)))
  }
}
