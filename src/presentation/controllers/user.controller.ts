import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put
} from '@nestjs/common'

import {
  CreateUserUsecase,
  DeleteUserUsecase,
  UpdateUserUsecase
} from '@/domain/usecases'
import { ManagerRole } from '@/presentation/decorators'
import { type ShowUserDto } from '@/presentation/resources'
import {
  CreateUserTransformer,
  ShowUserTransformer,
  UpdateUserTransformer
} from '@/presentation/transformers'
import {
  CreateUserValidated,
  UpdateUserValidated
} from '@/presentation/validation'

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUsecase: CreateUserUsecase,
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
