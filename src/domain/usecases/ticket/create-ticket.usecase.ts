import { UnprocessableEntityException } from '@nestjs/common'

import { type Usecase } from '@/domain/base'
import {
  type CreateTicketTextMessageInputDto,
  type CreateTicketInputDto
} from '@/domain/dtos'
import {
  type EquipmentEntity,
  type TicketEntity,
  type CategoryEntity,
  TicketStatus
} from '@/domain/entities'
import {
  type CategoryRepository,
  type EquipmentRepository,
  type TicketRepository
} from '@/domain/repositories'

import { type CreateTicketTextMessageUsecase } from './create-ticket-text-message.usecase'

export class CreateTicketUsecase implements Usecase<TicketEntity> {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly equipmentRepository: EquipmentRepository,
    private readonly createTicketTextMessageUsecase: CreateTicketTextMessageUsecase
  ) {}

  async execute(data: CreateTicketInputDto): Promise<TicketEntity> {
    const payload = await this.preparePayload(data)
    const ticket = await this.ticketRepository.create(payload)
    const messagePayload = this.prepareMessage(data, ticket)
    const message =
      await this.createTicketTextMessageUsecase.execute(messagePayload)

    return { ...ticket, messages: [message] }
  }

  private async preparePayload(
    data: CreateTicketInputDto
  ): Promise<Partial<TicketEntity>> {
    const { categoryId, reportedBy, title, equipmentId } = data
    const entity: Partial<TicketEntity> = {
      title,
      reportedBy,
      status: TicketStatus.NEW
    }

    entity.category = await this.getCategory(categoryId)
    entity.equipment = await this.getEquipment(equipmentId)

    return entity
  }

  private prepareMessage(
    data: CreateTicketInputDto,
    ticket: TicketEntity
  ): CreateTicketTextMessageInputDto {
    const message: CreateTicketTextMessageInputDto = {
      sentBy: data.reportedBy,
      message: data.message,
      ticketId: ticket.id
    }

    return message
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
