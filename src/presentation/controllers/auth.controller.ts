import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'

import { AccessTokenShow } from '@/domain/resources'
import { AuthenticateDto } from '@/shared/dtos'
import { AuthenticateUsecase } from '@/usecases'

@Controller('/auth')
export class AuthController {
  constructor(private readonly authenticateUsecase: AuthenticateUsecase) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async authenticate(@Body() data: AuthenticateDto): Promise<AccessTokenShow> {
    const token = await this.authenticateUsecase.execute(data)
    return AccessTokenShow.mapTo(token)
  }
}
