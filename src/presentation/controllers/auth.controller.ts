import { Body, Controller, Get, Post, Req } from '@nestjs/common'

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

@Controller('auth')
export class AuthController {
  constructor(private readonly authenticateUsecase: AuthenticateUsecase) {}

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
  @Get('whoami')
  async whoAmI(@Req() request: Request): Promise<WhoAmIDto> {
    const { user } = request
    return WhoAmITransformer.mapTo(user)
  }
}
