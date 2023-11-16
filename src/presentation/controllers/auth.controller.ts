import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req
} from '@nestjs/common'

import { AuthenticateUsecase, LogoutUsecase } from '@/domain/usecases'
import { AuthenticatedRoles, GuestRole } from '@/presentation/decorators'
import {
  type AuthenticateOutputDto,
  type WhoAmIOutputDto
} from '@/presentation/resources'
import {
  AuthenticateInputTransformer,
  AuthenticateOutputTransformer,
  LogoutInputTransformer,
  WhoAmITransformer
} from '@/presentation/transformers'
import { Request } from '@/presentation/types'
import { AuthenticateValidated } from '@/presentation/validation'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authenticateUsecase: AuthenticateUsecase,
    private readonly logoutUsecase: LogoutUsecase
  ) {}

  @GuestRole()
  @Post('login')
  async authenticate(
    @Body() data: AuthenticateValidated
  ): Promise<AuthenticateOutputDto> {
    const payload = AuthenticateInputTransformer.mapFrom(data)
    const token = await this.authenticateUsecase.execute(payload)
    return AuthenticateOutputTransformer.mapTo(token)
  }

  @AuthenticatedRoles()
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Req() request: Request): Promise<void> {
    const payload = LogoutInputTransformer.mapFrom(request.user)
    await this.logoutUsecase.execute(payload)
  }

  @AuthenticatedRoles()
  @Get('whoami')
  whoAmI(@Req() request: Request): WhoAmIOutputDto {
    const { user } = request
    return WhoAmITransformer.mapTo(user)
  }
}
