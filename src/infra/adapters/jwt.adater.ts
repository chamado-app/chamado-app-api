import { Inject } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { type JwtGenerator } from '@/domain/contracts'

export class JwtAdapter implements JwtGenerator {
  constructor(@Inject(JwtService) private readonly jwt: JwtService) {}

  async generate(payload: Record<string, string>): Promise<string> {
    return this.jwt.sign(payload)
  }
}
