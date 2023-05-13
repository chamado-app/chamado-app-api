import { Body, Controller, Post } from '@nestjs/common'
import { Observable } from 'rxjs'
import { AuthenticateDto } from 'src/shared/dtos/authenticate.dto'
import { type AuthenticatedDto } from 'src/shared/dtos/authenticated.dto'
import { AuthenticateUseCase } from 'src/usecases/authenticate.usecase'

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
