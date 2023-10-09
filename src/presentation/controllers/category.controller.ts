import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put
} from '@nestjs/common'

import { CategoriesList, CategoryShow } from '@/presentation/resources'
import { CreateCategoryDto } from '@/shared/dtos'
import {
  CreateCategoryUsecase,
  DeleteCategoryUsecase,
  ListCategoriesUsecase,
  UpdateCategoryUsecase
} from '@/usecases'

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategoryUsecase: CreateCategoryUsecase,
    private readonly updateCategoryUsecase: UpdateCategoryUsecase,
    private readonly listCategoriesUsecase: ListCategoriesUsecase,
    private readonly deleteCategoryUsecase: DeleteCategoryUsecase
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateCategoryDto): Promise<CategoryShow> {
    const createdCategory = await this.createCategoryUsecase.execute(data)
    return CategoryShow.mapTo(createdCategory)
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: CreateCategoryDto
  ): Promise<CategoryShow> {
    const updatedCategory = await this.updateCategoryUsecase.execute(id, data)
    return CategoryShow.mapTo(updatedCategory)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async list(): Promise<CategoriesList> {
    const categories = await this.listCategoriesUsecase.execute()
    return CategoriesList.mapTo(categories)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.deleteCategoryUsecase.execute(id)
  }
}
