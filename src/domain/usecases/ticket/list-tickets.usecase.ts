import { type GetManyOptions, type Usecase } from '@/domain/base'
import {
  type ListTicketsInputDto,
  type ListTicketsUsecaseOutputDto
} from '@/domain/dtos'
import { Role, type UserEntity, type TicketEntity } from '@/domain/entities'
import { type TicketRepository } from '@/domain/repositories'

export class ListTicketsUsecase
  implements Usecase<ListTicketsUsecaseOutputDto>
{
  constructor(private readonly repository: TicketRepository) {}

  async execute(
    options: ListTicketsInputDto
  ): Promise<ListTicketsUsecaseOutputDto> {
    const { take, skip, search, authenticatedUser } = options

    const getOptions: GetManyOptions<TicketEntity> = {
      take,
      skip,
      filter: {},
      orderBy: { createdAt: 'DESC' }
    }

    if (!this.canViewAllTickets(authenticatedUser)) {
      Object.assign(getOptions, {
        filter: { reportedBy: { id: authenticatedUser.id } }
      })
    }

    if (search) {
      getOptions.search = {
        value: search,
        fields: ['id', 'title']
      }
    }

    const { items, total } = await this.repository.getMany(getOptions)
    return { tickets: items, total }
  }

  private canViewAllTickets(authenticatedUser: UserEntity): boolean {
    const operationalRoles = [Role.MANAGER, Role.TECHNICIAN]

    return authenticatedUser.roles.some((role) =>
      operationalRoles.includes(role.name)
    )
  }
}
