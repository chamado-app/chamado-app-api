import { ForbiddenException, NotFoundException } from '@nestjs/common'

import { type GetOneOptions, type Usecase } from '@/domain/base'
import { type ChangeTicketStatusInputDto } from '@/domain/dtos'
import {
  type UserEntity,
  type TicketEntity,
  Role,
  TicketStatus
} from '@/domain/entities'
import { type TicketRepository } from '@/domain/repositories'

export class UpdateTicketStatusUsecase implements Usecase<void> {
  constructor(private readonly ticketRepository: TicketRepository) {}
  async execute(id: string, data: ChangeTicketStatusInputDto): Promise<void> {
    const { status } = data
    const options: GetOneOptions<TicketEntity> = {
      filter: { id }
    }

    const ticket = await this.ticketRepository.getOne(options)
    if (!ticket) throw new NotFoundException()
    if (!this.canUpdateStatus(ticket, data.authenticatedUser, status))
      throw new ForbiddenException()

    await this.ticketRepository.update(id, { status })
  }

  canUpdateStatus(
    ticket: TicketEntity,
    user: UserEntity,
    status: TicketStatus
  ): boolean {
    const operationalRoles = [Role.TECHNICIAN, Role.MANAGER]
    const isOwner = ticket.reportedBy.id === user.id

    if (status === TicketStatus.CANCELLED) return isOwner

    return user.roles.some((role) => operationalRoles.includes(role.name))
  }
}
