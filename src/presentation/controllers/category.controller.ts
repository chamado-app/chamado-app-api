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

import {
  type ListCategoriesDto,
  type ShowCategoryDto
} from '@/presentation/resources'
import {
  CreateCategoryTransformer,
  ListCategoriesTransformer,
  ShowCategoryTransformer,
  UpdateCategoryTransformer
} from '@/presentation/transformers'
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
  async create(@Body() dto: CreateCategoryDto): Promise<ShowCategoryDto> {
    const data = CreateCategoryTransformer.mapFrom(dto)
    const createdCategory = await this.createCategoryUsecase.execute(data)

    return ShowCategoryTransformer.mapTo(createdCategory)
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateCategoryDto
  ): Promise<ShowCategoryDto> {
    const data = UpdateCategoryTransformer.mapFrom(dto)
    const updatedCategory = await this.updateCategoryUsecase.execute(id, data)

    return ShowCategoryTransformer.mapTo(updatedCategory)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async list(): Promise<ListCategoriesDto> {
    const categories = await this.listCategoriesUsecase.execute()
    return ListCategoriesTransformer.mapTo(categories)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.deleteCategoryUsecase.execute(id)
  }
}
