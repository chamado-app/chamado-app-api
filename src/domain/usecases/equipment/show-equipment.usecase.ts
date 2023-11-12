import { NotFoundException } from '@nestjs/common'

import { type Usecase } from '@/domain/base'
import { type ShowEquipmentInputDto } from '@/domain/dtos'
import { type EquipmentEntity } from '@/domain/entities'
import { type EquipmentRepository } from '@/domain/repositories'

export class ShowEquipmentUsecase implements Usecase<EquipmentEntity> {
  constructor(private readonly repository: EquipmentRepository) {}

  async execute({ id }: ShowEquipmentInputDto): Promise<EquipmentEntity> {
    const filter: Partial<EquipmentEntity> = { id }
    const equipment = await this.repository.getOne({ filter })
    if (!equipment) throw new NotFoundException()
    return equipment
  }
}
