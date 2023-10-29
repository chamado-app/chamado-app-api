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
  Put,
  Query,
  Req
} from '@nestjs/common'

import {
  CreateCategoryUsecase,
  DeleteCategoryUsecase,
  ListCategoriesUsecase,
  ShowCategoryUsecase,
  UpdateCategoryUsecase
} from '@/domain/usecases'
import { AuthenticatedRoles, ManagerRole } from '@/presentation/decorators'
import {
  type ListCategoriesOutputDto,
  type ShowCategoryDto
} from '@/presentation/resources'
import {
  CreateCategoryTransformer,
  ListCategoriesTransformer,
  ShowCategoryTransformer,
  UpdateCategoryTransformer
} from '@/presentation/transformers'
import {
  CreateCategoryValidated,
  ListCategoriesValidated,
  UpdateCategoryValidated
} from '@/presentation/validation'

import { Request } from '../types'

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategoryUsecase: CreateCategoryUsecase,
    private readonly showCategoryUsecase: ShowCategoryUsecase,
    private readonly updateCategoryUsecase: UpdateCategoryUsecase,
    private readonly listCategoriesUsecase: ListCategoriesUsecase,
    private readonly deleteCategoryUsecase: DeleteCategoryUsecase
  ) {}

  @ManagerRole()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: CreateCategoryValidated
  ): Promise<ShowCategoryDto> {
    const payload = CreateCategoryTransformer.mapFrom(data)
    const createdCategory = await this.createCategoryUsecase.execute(payload)
    return ShowCategoryTransformer.mapTo(createdCategory)
  }

  @AuthenticatedRoles()
  @Get()
  async list(
    @Query() query: ListCategoriesValidated,
    @Req() request: Request
  ): Promise<ListCategoriesOutputDto> {
    const payload = ListCategoriesTransformer.mapFrom(query, request.user.roles)
    const result = await this.listCategoriesUsecase.execute(payload)
    return ListCategoriesTransformer.mapTo(result)
  }

  @AuthenticatedRoles()
  @Get(':id')
  async show(@Param('id', ParseUUIDPipe) id: string): Promise<ShowCategoryDto> {
    const category = await this.showCategoryUsecase.execute(id)
    return ShowCategoryTransformer.mapTo(category)
  }

  @ManagerRole()
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateCategoryValidated
  ): Promise<ShowCategoryDto> {
    const payload = UpdateCategoryTransformer.mapFrom(data)
    const category = await this.updateCategoryUsecase.execute(id, payload)
    return ShowCategoryTransformer.mapTo(category)
  }

  @ManagerRole()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.deleteCategoryUsecase.execute(id)
  }
}
