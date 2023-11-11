import { type EquipmentEntity } from '@/domain/entities'
import { ShowEquipmentDto } from '@/presentation/resources'

export class ShowEquipmentTransformer {
  static mapTo(entity: EquipmentEntity): ShowEquipmentDto {
    return new ShowEquipmentDto(
      entity.id,
      entity.name,
      entity.brand,
      entity.model,
      entity.type,
      entity.section,
      entity.serial ?? '',
      entity.patrimony ?? '',
      entity.additionalInfo ?? '',
      entity.status,
      entity.createdAt,
      entity.updatedAt
    )
  }
}
