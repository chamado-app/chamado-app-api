import { PartialType } from '@nestjs/mapped-types'

import { CreateEquipmentValidated } from './create-equipment'

export class UpdateEquipmentValidated extends PartialType(
  CreateEquipmentValidated
) {}
