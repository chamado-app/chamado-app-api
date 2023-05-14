import { Body, Controller, Post } from '@nestjs/common'
import { Observable } from 'rxjs'

import { AuthenticateDto, type AuthenticatedDto } from '@/domain/dtos'
import { AuthenticateUsecase } from '@/usecases'

@Controller('/auth')
export class AuthController {
  constructor(private readonly authenticateUsecase: AuthenticateUsecase) {}

  @Post('login')
  authenticate(
    @Body() credentials: AuthenticateDto
  ): Observable<AuthenticatedDto> {
    return this.authenticateUsecase.execute(credentials)
  }
}
