import { PartialType } from '@nestjs/mapped-types'

import { CreateUserValidated } from './create-user'

export class UpdateUserValidated extends PartialType(CreateUserValidated) {}
