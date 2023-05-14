import { Body, Controller, Post } from '@nestjs/common'
import { Observable } from 'rxjs'

import { AuthenticateDto, type AuthenticatedDto } from '@/domain/dtos'
import { AuthenticateUseCase } from '@/usecases'

@Controller('/auth')
export class AuthController {
  constructor(private readonly authenticateUseCase: AuthenticateUseCase) {}

  @Post('login')
  authenticate(
    @Body() credentials: AuthenticateDto
  ): Observable<AuthenticatedDto> {
    return this.authenticateUseCase.execute(credentials)
  }
}
