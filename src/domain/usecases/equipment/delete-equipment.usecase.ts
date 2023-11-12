import { type Usecase } from '@/domain/base'
import { type EquipmentRepository } from '@/domain/repositories'

export class DeleteEquipmentUsecase implements Usecase<void> {
  constructor(private readonly repository: EquipmentRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete({ id })
  }
}
