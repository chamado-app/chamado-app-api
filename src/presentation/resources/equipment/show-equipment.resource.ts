import { type EquipmentEntity } from '@/domain/entities'

export class ShowEquipmentDto {
  constructor(
    readonly id: EquipmentEntity['id'],
    readonly name: EquipmentEntity['name'],
    readonly brand: EquipmentEntity['brand'],
    readonly model: EquipmentEntity['model'],
    readonly type: EquipmentEntity['type'],
    readonly section: EquipmentEntity['section'],
    readonly serial: EquipmentEntity['serial'],
    readonly patrimony: EquipmentEntity['patrimony'],
    readonly additionalInfo: EquipmentEntity['additionalInfo'],
    readonly status: EquipmentEntity['status'],
    readonly createdAt: EquipmentEntity['createdAt'],
    readonly updatedAt: EquipmentEntity['updatedAt']
  ) {}
}
