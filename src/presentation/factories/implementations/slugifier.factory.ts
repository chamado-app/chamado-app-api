import { type Provider } from '@nestjs/common'

import { Slugifier } from '@/domain/contracts'
import { Slugify } from '@/infra'

export const makeSlugifier = (): Provider => ({
  provide: Slugifier,
  useClass: Slugify
})
