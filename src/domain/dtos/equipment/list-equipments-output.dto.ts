import { type EquipmentEntity } from '@/domain/entities'

export class ListEquipmentsUsecaseOutputDto {
  constructor(
    readonly equipments: EquipmentEntity[],
    readonly total: number
  ) {}
}
