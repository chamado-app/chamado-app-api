import { NotFoundException } from '@nestjs/common'

import { type Usecase } from '@/domain/base'
import { type UpdateEquipmentInputDto } from '@/domain/dtos'
import { type EquipmentEntity } from '@/domain/entities'
import { type EquipmentRepository } from '@/domain/repositories'

export class UpdateEquipmentUsecase implements Usecase<EquipmentEntity> {
  constructor(private readonly repository: EquipmentRepository) {}

  async execute(
    id: string,
    data: UpdateEquipmentInputDto
  ): Promise<EquipmentEntity> {
    const existingEquipment = await this.repository.getOne({ filter: { id } })

    if (!existingEquipment) throw new NotFoundException()

    const payload = this.prepareEquipmentToUpdate(existingEquipment, data)
    return this.repository.update(id, payload)
  }

  private prepareEquipmentToUpdate(
    existingEquipment: EquipmentEntity,
    updatedEquipment: UpdateEquipmentInputDto
  ): Partial<EquipmentEntity> {
    const equipment = { ...existingEquipment, ...updatedEquipment }
    return equipment
  }
}
