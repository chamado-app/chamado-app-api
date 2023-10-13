import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'

import { AuthenticateUsecase } from '@/domain/usecases'
import { Public } from '@/presentation/decorators'
import { type AuthenticateOutputDto } from '@/presentation/resources'
import {
  AuthenticateInputTransformer,
  AuthenticateOutputTransformer
} from '@/presentation/transformers'
import { AuthenticateValidated } from '@/presentation/validation'

@Controller('/auth')
export class AuthController {
  constructor(private readonly authenticateUsecase: AuthenticateUsecase) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async authenticate(
    @Body() dto: AuthenticateValidated
  ): Promise<AuthenticateOutputDto> {
    const data = AuthenticateInputTransformer.mapFrom(dto)
    const token = await this.authenticateUsecase.execute(data)
    return AuthenticateOutputTransformer.mapTo(token)
  }
}
