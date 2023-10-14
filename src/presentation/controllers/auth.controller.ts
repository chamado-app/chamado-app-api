import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req
} from '@nestjs/common'

import { AuthenticateUsecase } from '@/domain/usecases'
import { AuthenticatedRoles, GuestRole } from '@/presentation/decorators'
import {
  type AuthenticateOutputDto,
  type WhoAmIDto
} from '@/presentation/resources'
import {
  AuthenticateInputTransformer,
  AuthenticateOutputTransformer,
  WhoAmITransformer
} from '@/presentation/transformers'
import { Request } from '@/presentation/types'
import { AuthenticateValidated } from '@/presentation/validation'

@Controller('/auth')
export class AuthController {
  constructor(private readonly authenticateUsecase: AuthenticateUsecase) {}

  @GuestRole()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async authenticate(
    @Body() dto: AuthenticateValidated
  ): Promise<AuthenticateOutputDto> {
    const data = AuthenticateInputTransformer.mapFrom(dto)
    const token = await this.authenticateUsecase.execute(data)
    return AuthenticateOutputTransformer.mapTo(token)
  }

  @AuthenticatedRoles()
  @Get('whoami')
  @HttpCode(HttpStatus.OK)
  async whoAmI(@Req() request: Request): Promise<WhoAmIDto> {
    const { user } = request
    return WhoAmITransformer.mapTo(user)
  }
}
