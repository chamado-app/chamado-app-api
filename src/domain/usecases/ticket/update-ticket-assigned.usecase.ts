import { ForbiddenException, NotFoundException } from '@nestjs/common'

import { type GetOneOptions, type Usecase } from '@/domain/base'
import { type ChangeTicketAssignedInputDto } from '@/domain/dtos'
import {
  type UserEntity,
  type TicketEntity,
  TicketStatus
} from '@/domain/entities'
import {
  type UserRepository,
  type TicketRepository
} from '@/domain/repositories'

export class UpdateTicketAssignedUsecase implements Usecase<void> {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly userRepositiory: UserRepository
  ) {}

  async execute(id: string, data: ChangeTicketAssignedInputDto): Promise<void> {
    const { assignedToId } = data
    const options: GetOneOptions<TicketEntity> = {
      filter: { id },
      relations: ['reportedBy']
    }

    const ticket = await this.ticketRepository.getOne(options)
    if (!ticket) throw new NotFoundException()

    const assignedTo = await this.userRepositiory.getOne({
      filter: { id: assignedToId }
    })
    if (!assignedTo) throw new NotFoundException()

    if (!this.canChangeAssigned(ticket, assignedTo))
      throw new ForbiddenException()

    await this.ticketRepository.update(id, {
      assignedTo,
      status: TicketStatus.IN_PROGRESS
    })
  }

  canChangeAssigned(ticket: TicketEntity, assignedTo: UserEntity): boolean {
    return ticket.reportedBy.id !== assignedTo.id
  }
}
