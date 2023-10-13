import { Inject } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { type JwtGenerator, type JwtVerifier } from '@/domain/contracts'

export class JwtAdapter implements JwtGenerator, JwtVerifier {
  constructor(@Inject(JwtService) private readonly jwt: JwtService) {}

  async generate(payload: Record<string, string>): Promise<string> {
    return this.jwt.sign(payload)
  }

  async verify(token: string): Promise<any> {
    return this.jwt.verify(token)
  }
}
