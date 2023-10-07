import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'

import { CategoryShow } from '@/domain/resources'
import { CreateCategoryDto } from '@/shared/dtos'
import { CreateCategoryUsecase } from '@/usecases'

@Controller('/categories')
export class CategoryController {
  constructor(private readonly createCategoryUsecase: CreateCategoryUsecase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateCategoryDto): Promise<CategoryShow> {
    const createdCategory = await this.createCategoryUsecase.execute(data)
    return CategoryShow.mapTo(createdCategory)
  }
}
