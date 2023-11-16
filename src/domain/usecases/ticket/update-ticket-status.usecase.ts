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
import { getTicketStatusLabel } from '@/domain/utils'

import { type CreateTicketSystemMessageUsecase } from './create-ticket-system-message.usecase'

export class UpdateTicketStatusUsecase implements Usecase<void> {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly createTicketSystemMessageUsecase: CreateTicketSystemMessageUsecase
  ) {}

  async execute(id: string, data: ChangeTicketStatusInputDto): Promise<void> {
    const { status } = data
    const options: GetOneOptions<TicketEntity> = {
      filter: { id },
      relations: ['reportedBy']
    }

    const ticket = await this.ticketRepository.getOne(options)
    if (!ticket) throw new NotFoundException()
    if (!this.canUpdateStatus(ticket, data.authenticatedUser, status))
      throw new ForbiddenException()

    await this.ticketRepository.update(id, { status })
    await this.sendSystemMessage(ticket, status)
  }

  canUpdateStatus(
    ticket: TicketEntity,
    user: UserEntity,
    status: TicketStatus
  ): boolean {
    if ([TicketStatus.CANCELLED, TicketStatus.DONE].includes(ticket.status))
      return false

    const operationalRoles = [Role.TECHNICIAN, Role.MANAGER]
    const isOwner = ticket.reportedBy.id === user.id

    if (status === TicketStatus.CANCELLED) return isOwner

    return user.roles.some((role) => operationalRoles.includes(role.name))
  }

  async sendSystemMessage(
    ticket: TicketEntity,
    status: TicketStatus
  ): Promise<void> {
    if (ticket.status === status) return

    const statusLabel = getTicketStatusLabel(status)
    const message = `Situação do chamado alterado para "${statusLabel}"`

    await this.createTicketSystemMessageUsecase.execute({
      ticketId: ticket.id,
      message
    })
  }
}
