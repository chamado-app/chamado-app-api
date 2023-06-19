import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { Observable } from 'rxjs'

import { AuthenticateDto, type AuthenticatedDto } from '@/shared/dtos'
import { AuthenticateUsecase } from '@/usecases'

@Controller('/auth')
export class AuthController {
  constructor(private readonly authenticateUsecase: AuthenticateUsecase) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  authenticate(
    @Body() credentials: AuthenticateDto
  ): Observable<AuthenticatedDto> {
    return this.authenticateUsecase.execute(credentials)
  }
}
