import { CreateEquipmentInputDto } from '@/domain/dtos'
import { type CreateEquipmentValidated } from '@/presentation/validation'

export class CreateEquipmentTransformer {
  static mapFrom(data: CreateEquipmentValidated): CreateEquipmentInputDto {
    return new CreateEquipmentInputDto(
      data.name,
      data.brand,
      data.model,
      data.type,
      data.section,
      data.serial ?? undefined,
      data.patrimony ?? undefined,
      data.additionalInfo ?? undefined,
      data.status
    )
  }
}
