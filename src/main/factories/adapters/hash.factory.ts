import { type Provider } from '@nestjs/common'

import { HashComparer, HashGenerator } from '@/domain/contracts'
import { BcryptAdapter } from '@/infra'

export const makeHashComparerFactory = (): Provider => ({
  provide: HashComparer,
  useClass: BcryptAdapter
})

export const makeHashGeneratorFactory = (): Provider => ({
  provide: HashGenerator,
  useClass: BcryptAdapter
})

export const makePureHashGeneratorFactory = (): HashGenerator =>
  new BcryptAdapter()
