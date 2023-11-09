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
  CreateUserUsecase,
  DeleteUserUsecase,
  ListUsersUsecase,
  ShowUserUsecase,
  UpdateUserUsecase
} from '@/domain/usecases'
import { ManagerRole } from '@/presentation/decorators'
import {
  type ListUsersOutputDto,
  type ShowUserDto
} from '@/presentation/resources'
import {
  CreateUserTransformer,
  ShowUserInputTransformer,
  ShowUserTransformer,
  UpdateUserTransformer,
  ListUsersInputTransformer,
  ListUsersOutputTransformer
} from '@/presentation/transformers'
import { Request } from '@/presentation/types'
import {
  CreateUserValidated,
  ListUsersValidated,
  UpdateUserValidated
} from '@/presentation/validation'

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUsecase: CreateUserUsecase,
    private readonly listUsersUsecase: ListUsersUsecase,
    private readonly showUserUsecase: ShowUserUsecase,
    private readonly updateUserUsecase: UpdateUserUsecase,
    private readonly deleteUserUsecase: DeleteUserUsecase
  ) {}

  @ManagerRole()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateUserValidated): Promise<ShowUserDto> {
    const payload = CreateUserTransformer.mapFrom(data)
    const createdUser = await this.createUserUsecase.execute(payload)
    return ShowUserTransformer.mapTo(createdUser)
  }

  @ManagerRole()
  @Get()
  async list(
    @Query() query: ListUsersValidated,
    @Req() request: Request
  ): Promise<ListUsersOutputDto> {
    const roles = request.user.roles
    const payload = ListUsersInputTransformer.mapFrom(query, roles)
    const result = await this.listUsersUsecase.execute(payload)
    return ListUsersOutputTransformer.mapTo(result)
  }

  @ManagerRole()
  @Get(':id')
  async show(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() request: Request
  ): Promise<ShowUserDto> {
    const roles = request.user.roles
    const payload = ShowUserInputTransformer.mapFrom(id, roles)
    const user = await this.showUserUsecase.execute(payload)
    return ShowUserTransformer.mapTo(user)
  }

  @ManagerRole()
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateUserValidated
  ): Promise<ShowUserDto> {
    const payload = UpdateUserTransformer.mapFrom(data)
    const user = await this.updateUserUsecase.execute(id, payload)
    return ShowUserTransformer.mapTo(user)
  }

  @ManagerRole()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.deleteUserUsecase.execute(id)
  }
}
