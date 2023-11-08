import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'

import { CreateUserUsecase } from '@/domain/usecases'
import { ManagerRole } from '@/presentation/decorators'
import { type ShowUserDto } from '@/presentation/resources'
import {
  CreateUserTransformer,
  ShowUserTransformer
} from '@/presentation/transformers'
import { CreateUserValidated } from '@/presentation/validation'

@Controller('users')
export class UserController {
  constructor(private readonly createUserUsecase: CreateUserUsecase) {}

  @ManagerRole()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateUserValidated): Promise<ShowUserDto> {
    const payload = CreateUserTransformer.mapFrom(data)
    const createdUser = await this.createUserUsecase.execute(payload)
    return ShowUserTransformer.mapTo(createdUser)
  }
}
