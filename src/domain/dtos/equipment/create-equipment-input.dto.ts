import { EquipmentStatus, type EquipmentEntity } from '@/domain/entities'

export class CreateEquipmentInputDto {
  constructor(
    readonly name: EquipmentEntity['name'],
    readonly brand: EquipmentEntity['brand'],
    readonly model: EquipmentEntity['model'],
    readonly type: EquipmentEntity['type'],
    readonly section: EquipmentEntity['section'],
    readonly serial?: EquipmentEntity['serial'],
    readonly patrimony?: EquipmentEntity['patrimony'],
    readonly additionalInfo?: EquipmentEntity['additionalInfo'],
    readonly status: EquipmentEntity['status'] = EquipmentStatus.WORKING
  ) {}
}
