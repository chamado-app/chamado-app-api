import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { Observable, map } from 'rxjs'

import { CategoryShow } from '@/domain/resources'
import { CreateCategoryDto } from '@/shared/dtos'
import { CreateCategoryUsecase } from '@/usecases'

@Controller('/categories')
export class CategoryController {
  constructor(private readonly createCategoryUsecase: CreateCategoryUsecase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() data: CreateCategoryDto): Observable<CategoryShow> {
    return this.createCategoryUsecase
      .execute(data)
      .pipe(map(CategoryShow.mapTo))
  }
}
