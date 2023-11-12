import { IntersectionType } from '@nestjs/mapped-types'

import { BaseListValidated } from '@/presentation/validation/base'

export abstract class ListTicketsValidated extends IntersectionType(
  BaseListValidated
) {}
