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
  FetchCategoriesUsecase,
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
  FetchCategoriesOutputTransformer,
  ListCategoriesInputTransformer,
  ListCategoriesOutputTransformer,
  ShowCategoryInputTransformer,
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
    private readonly listCategoriesUsecase: ListCategoriesUsecase,
    private readonly fetchCategoriesUsecase: FetchCategoriesUsecase,
    private readonly updateCategoryUsecase: UpdateCategoryUsecase,
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
    const roles = request.user.roles
    const payload = ListCategoriesInputTransformer.mapFrom(query, roles)
    const result = await this.listCategoriesUsecase.execute(payload)
    return ListCategoriesOutputTransformer.mapTo(result)
  }

  @AuthenticatedRoles()
  @Get('/fetch')
  async fetch(): Promise<ShowCategoryDto[]> {
    const result = await this.fetchCategoriesUsecase.execute()
    return FetchCategoriesOutputTransformer.mapTo(result)
  }

  @AuthenticatedRoles()
  @Get(':id')
  async show(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() request: Request
  ): Promise<ShowCategoryDto> {
    const roles = request.user.roles
    const payload = ShowCategoryInputTransformer.mapFrom(id, roles)
    const category = await this.showCategoryUsecase.execute(payload)
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
