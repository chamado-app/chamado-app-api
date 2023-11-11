import { type Usecase } from '@/domain/base'
import { type CreateEquipmentInputDto } from '@/domain/dtos'
import { type EquipmentEntity } from '@/domain/entities'
import { type EquipmentRepository } from '@/domain/repositories'

export class CreateEquipmentUsecase implements Usecase<EquipmentEntity> {
  constructor(private readonly repository: EquipmentRepository) {}

  async execute(data: CreateEquipmentInputDto): Promise<EquipmentEntity> {
    const payload = this.preparePayload(data)
    const result = await this.repository.create(payload)
    return { ...payload, ...result }
  }

  private preparePayload(
    data: CreateEquipmentInputDto
  ): Partial<EquipmentEntity> {
    return { ...data }
  }
}
