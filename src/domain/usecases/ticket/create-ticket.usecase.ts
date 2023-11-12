import { UnprocessableEntityException } from '@nestjs/common'

import { type Usecase } from '@/domain/base'
import { type CreateTicketInputDto } from '@/domain/dtos'
import {
  type EquipmentEntity,
  type TicketMessageEntity,
  type TicketEntity,
  TicketMessageType,
  type CategoryEntity,
  type UserEntity
} from '@/domain/entities'
import {
  type CategoryRepository,
  type EquipmentRepository,
  type TicketRepository
} from '@/domain/repositories'

export class CreateTicketUsecase implements Usecase<TicketEntity> {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly equipmentRepository: EquipmentRepository,
    private readonly categoryRepository: CategoryRepository
  ) {}

  async execute(data: CreateTicketInputDto): Promise<TicketEntity> {
    const payload = await this.preparePayload(data)
    return await this.ticketRepository.create(payload)
  }

  private async preparePayload(
    data: CreateTicketInputDto
  ): Promise<Partial<TicketEntity>> {
    const { categoryId, reportedBy, title, message, equipmentId } = data
    const entity: Partial<TicketEntity> = { title }

    entity.messages = this.prepareMessages(reportedBy, message)
    entity.category = await this.getCategory(categoryId)
    entity.equipment = await this.getEquipment(equipmentId)

    return entity
  }

  private prepareMessages(
    reportedBy: UserEntity,
    text: string
  ): TicketMessageEntity[] {
    const message: Partial<TicketMessageEntity> = {
      sentBy: reportedBy,
      text,
      type: TicketMessageType.TEXT
    }

    return [message] as TicketMessageEntity[]
  }

  private async getCategory(id?: string): Promise<CategoryEntity | undefined> {
    if (!id) return

    const category = await this.categoryRepository.getOne({ filter: { id } })
    if (!category) throw new UnprocessableEntityException()
    return category
  }

  private async getEquipment(
    id?: string
  ): Promise<EquipmentEntity | undefined> {
    if (!id) return

    const equipment = await this.equipmentRepository.getOne({ filter: { id } })
    if (!equipment) throw new UnprocessableEntityException()
    return equipment
  }
}
