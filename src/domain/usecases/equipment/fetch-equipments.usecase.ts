import { type GetManyOptions, type Usecase } from '@/domain/base'
import { type EquipmentEntity } from '@/domain/entities'
import { type EquipmentRepository } from '@/domain/repositories'

export class FetchEquipmentsUsecase implements Usecase<EquipmentEntity[]> {
  constructor(private readonly repository: EquipmentRepository) {}

  async execute(): Promise<EquipmentEntity[]> {
    const getOptions: GetManyOptions<EquipmentEntity> = {
      orderBy: { name: 'ASC' },
      fields: ['id', 'name']
    }

    const { items: equipments } = await this.repository.getMany(getOptions)
    return equipments
  }
}
