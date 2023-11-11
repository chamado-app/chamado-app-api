import { Repository } from '@/domain/base'
import { type EquipmentEntity } from '@/domain/entities'

export abstract class EquipmentRepository extends Repository<EquipmentEntity> {}
