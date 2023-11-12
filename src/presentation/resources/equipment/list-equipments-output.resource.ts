import { type ShowEquipmentDto } from './show-equipment.resource'

export class ListEquipmentsOutputDto {
  constructor(
    readonly equipments: ShowEquipmentDto[],
    readonly total: number
  ) {}
}
