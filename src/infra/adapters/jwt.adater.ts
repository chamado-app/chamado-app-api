import { Inject } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { type Observable, of } from 'rxjs'

import { type JwtGenerator } from '@/domain/contracts'

export class JwtAdapter implements JwtGenerator {
  constructor(@Inject(JwtService) private readonly jwt: JwtService) {}

  generate(payload: Record<string, string>): Observable<string> {
    return of(this.jwt.sign(payload))
  }
}
