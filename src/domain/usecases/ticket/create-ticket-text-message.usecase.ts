import { NotFoundException } from '@nestjs/common'

import { type Usecase } from '@/domain/base'
import { type CreateTicketTextMessageInputDto } from '@/domain/dtos'
import {
  Role,
  type TicketEntity,
  type TicketMessageEntity,
  TicketMessageType,
  TicketStatus,
  type UserEntity
} from '@/domain/entities'
import {
  type TicketMessageRepository,
  type TicketRepository
} from '@/domain/repositories'

export class CreateTicketTextMessageUsecase
  implements Usecase<TicketMessageEntity>
{
  constructor(
    private readonly ticketMessageRepository: TicketMessageRepository,
    private readonly ticketRepository: TicketRepository
  ) {}

  async execute(
    data: CreateTicketTextMessageInputDto
  ): Promise<TicketMessageEntity> {
    const ticket = await this.ticketRepository.getOne({
      filter: { id: data.ticketId },
      relations: ['reportedBy']
    })

    if (!ticket || !this.ticketCanAddMessage(ticket, data.sentBy))
      throw new NotFoundException()

    const payload = this.preparePayload(data, ticket)
    return await this.ticketMessageRepository.create(payload)
  }

  private ticketCanAddMessage(
    ticket: TicketEntity,
    sentBy: UserEntity
  ): boolean {
    const impossibleStatuses = [TicketStatus.DONE, TicketStatus.CANCELLED]
    const operationalRoles = [Role.MANAGER, Role.TECHNICIAN]

    if (impossibleStatuses.includes(ticket.status)) return false
    if (ticket.reportedBy.id === sentBy.id) return true

    return sentBy.roles.some((role) => operationalRoles.includes(role.name))
  }

  private preparePayload(
    data: CreateTicketTextMessageInputDto,
    ticket: TicketEntity
  ): Partial<TicketMessageEntity> {
    const entity: Partial<TicketMessageEntity> = {
      type: TicketMessageType.TEXT,
      text: data.message,
      sentBy: data.sentBy,
      ticket
    }

    return entity
  }
}
