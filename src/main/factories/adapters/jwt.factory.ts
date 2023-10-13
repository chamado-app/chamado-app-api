import { type Provider } from '@nestjs/common'

import { JwtGenerator, JwtVerifier } from '@/domain/contracts'
import { JwtAdapter } from '@/infra'

export const makeJwtGeneratorFactory = (): Provider => ({
  provide: JwtGenerator,
  useClass: JwtAdapter
})

export const makeJwtVerifierFactory = (): Provider => ({
  provide: JwtVerifier,
  useClass: JwtAdapter
})
