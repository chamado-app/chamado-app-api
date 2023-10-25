import { Inject } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import {
  type JwtVerifierResult,
  type JwtGenerator,
  type JwtVerifier
} from '@/domain/contracts'

export class JwtAdapter implements JwtGenerator, JwtVerifier {
  constructor(@Inject(JwtService) private readonly jwt: JwtService) {}

  async generate(payload: Record<string, string>): Promise<string> {
    return await this.jwt.signAsync(payload)
  }

  async verify(token: string): Promise<JwtVerifierResult> {
    const result = await this.jwt.verifyAsync<object>(token)
    return result as JwtVerifierResult
  }
}
