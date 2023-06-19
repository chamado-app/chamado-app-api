import { type Provider } from '@nestjs/common'

import { HashComparer } from '@/domain/contracts'
import { BcryptAdapter } from '@/infra'

export const makeHashComparerFactory = (): Provider => ({
  provide: HashComparer,
  useClass: BcryptAdapter
})
