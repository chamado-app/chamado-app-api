import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put
} from '@nestjs/common'

import { CreateUserUsecase, UpdateUserUsecase } from '@/domain/usecases'
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
    private readonly updateUserUsecase: UpdateUserUsecase
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
}
