import { UpdateEquipmentInputDto } from '@/domain/dtos'
import { type UpdateEquipmentValidated } from '@/presentation/validation'

export class UpdateEquipmentTransformer {
  static mapFrom(data: UpdateEquipmentValidated): UpdateEquipmentInputDto {
    return new UpdateEquipmentInputDto(
      data.name ?? undefined,
      data.brand ?? undefined,
      data.model ?? undefined,
      data.type ?? undefined,
      data.section ?? undefined,
      data.serial ?? undefined,
      data.patrimony ?? undefined,
      data.additionalInfo ?? undefined,
      data.status ?? undefined
    )
  }
}
