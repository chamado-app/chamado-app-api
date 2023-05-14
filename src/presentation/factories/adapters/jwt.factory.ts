import { type Provider } from '@nestjs/common'

import { JwtGenerator } from '@/domain/contracts'
import { JwtAdapter } from '@/infra'

export const makeJwtGeneratorFactory = (): Provider => ({
  provide: JwtGenerator,
  useClass: JwtAdapter
})
