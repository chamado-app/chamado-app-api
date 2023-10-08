import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post
} from '@nestjs/common'

import { CategoriesList, CategoryShow } from '@/domain/resources'
import { CreateCategoryDto } from '@/shared/dtos'
import { CreateCategoryUsecase, ListCategoriesUsecase } from '@/usecases'

@Controller('/categories')
export class CategoryController {
  constructor(
    private readonly listCategoriesUsecase: ListCategoriesUsecase,
    private readonly createCategoryUsecase: CreateCategoryUsecase
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async list(): Promise<CategoriesList> {
    const categories = await this.listCategoriesUsecase.execute()
    return CategoriesList.mapTo(categories)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateCategoryDto): Promise<CategoryShow> {
    const createdCategory = await this.createCategoryUsecase.execute(data)
    return CategoryShow.mapTo(createdCategory)
  }
}
