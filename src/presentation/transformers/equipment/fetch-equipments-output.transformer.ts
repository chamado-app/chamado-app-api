import { type EquipmentEntity } from '@/domain/entities'
import { type ShowEquipmentDto } from '@/presentation/resources'

import { ShowEquipmentTransformer } from './show-equipment-output.transformer'

export class FetchEquipmentsOutputTransformer {
  static mapTo(equipments: EquipmentEntity[]): ShowEquipmentDto[] {
    return equipments.map((equipment) =>
      ShowEquipmentTransformer.mapTo(equipment)
    )
  }
}
