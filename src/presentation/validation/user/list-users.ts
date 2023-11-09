import { IntersectionType } from '@nestjs/mapped-types'

import { BaseListValidated } from '@/presentation/validation/base'

export abstract class ListUsersValidated extends IntersectionType(
  BaseListValidated
) {}
