import { NotFoundException } from '@nestjs/common'

import { type Usecase } from '@/domain/base'
import { type ShowTicketInputDto } from '@/domain/dtos'
import { Role, type UserEntity, type TicketEntity } from '@/domain/entities'
import { type TicketRepository } from '@/domain/repositories'

export class ShowTicketUsecase implements Usecase<TicketEntity> {
  constructor(private readonly repository: TicketRepository) {}

  async execute({
    id,
    authenticatedUser
  }: ShowTicketInputDto): Promise<TicketEntity> {
    const filter: Partial<TicketEntity> = { id }

    if (!this.isOperationalRoles(authenticatedUser)) {
      filter.reportedBy = authenticatedUser
    }

    const ticket = await this.repository.getOne({
      filter,
      relations: [
        'reportedBy',
        'assignedTo',
        'category',
        'equipment',
        'messages'
      ]
    })

    if (!ticket) throw new NotFoundException()
    return ticket
  }

  private isOperationalRoles(user: UserEntity): boolean {
    const operationalRoles = [Role.MANAGER, Role.TECHNICIAN]
    return user.roles.some((role) => operationalRoles.includes(role.name))
  }
}
