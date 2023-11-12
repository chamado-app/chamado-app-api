import { type ListEquipmentsUsecaseOutputDto } from '@/domain/dtos'
import { ListEquipmentsOutputDto } from '@/presentation/resources'

import { ShowEquipmentTransformer } from './show-equipment-output.transformer'

export class ListEquipmentsOutputTransformer {
  static mapTo(data: ListEquipmentsUsecaseOutputDto): ListEquipmentsOutputDto {
    const { equipments, total } = data
    const transformedEquipments = equipments.map((Equipment) =>
      ShowEquipmentTransformer.mapTo(Equipment)
    )
    return new ListEquipmentsOutputDto(transformedEquipments, total)
  }
}
