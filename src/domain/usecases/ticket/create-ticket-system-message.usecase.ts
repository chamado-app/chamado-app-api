import { NotFoundException } from '@nestjs/common'

import { type Usecase } from '@/domain/base'
import { type CreateTicketSystemMessageInputDto } from '@/domain/dtos'
import {
  type TicketEntity,
  type TicketMessageEntity,
  TicketMessageType
} from '@/domain/entities'
import {
  type TicketMessageRepository,
  type TicketRepository
} from '@/domain/repositories'

export class CreateTicketSystemMessageUsecase
  implements Usecase<TicketMessageEntity>
{
  constructor(
    private readonly ticketMessageRepository: TicketMessageRepository,
    private readonly ticketRepository: TicketRepository
  ) {}

  async execute(
    data: CreateTicketSystemMessageInputDto
  ): Promise<TicketMessageEntity> {
    const ticket = await this.ticketRepository.getOne({
      filter: { id: data.ticketId },
      relations: ['reportedBy']
    })

    if (!ticket) throw new NotFoundException()

    const payload = this.preparePayload(data, ticket)
    return await this.ticketMessageRepository.create(payload)
  }

  private preparePayload(
    data: CreateTicketSystemMessageInputDto,
    ticket: TicketEntity
  ): Partial<TicketMessageEntity> {
    const entity: Partial<TicketMessageEntity> = {
      type: TicketMessageType.SYSTEM,
      text: data.message,
      ticket
    }

    return entity
  }
}
