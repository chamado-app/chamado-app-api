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
  Req
} from '@nestjs/common'

import {
  CreateUserUsecase,
  DeleteUserUsecase,
  ShowUserUsecase,
  UpdateUserUsecase
} from '@/domain/usecases'
import { ManagerRole } from '@/presentation/decorators'
import { type ShowUserDto } from '@/presentation/resources'
import {
  CreateUserTransformer,
  ShowUserInputTransformer,
  ShowUserTransformer,
  UpdateUserTransformer
} from '@/presentation/transformers'
import {
  CreateUserValidated,
  UpdateUserValidated
} from '@/presentation/validation'

import { Request } from '../types'

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUsecase: CreateUserUsecase,
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
