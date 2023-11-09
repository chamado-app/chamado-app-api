import { type GetManyOptions, type Usecase } from '@/domain/base'
import {
  type ListUsersInputDto,
  type ListUsersUsecaseOutputDto
} from '@/domain/dtos'
import { Role, type UserEntity } from '@/domain/entities'
import { type UserRepository } from '@/domain/repositories'

export class ListUsersUsecase implements Usecase<ListUsersUsecaseOutputDto> {
  constructor(private readonly repository: UserRepository) {}

  async execute(
    options: ListUsersInputDto
  ): Promise<ListUsersUsecaseOutputDto> {
    const { take, skip, search, roles } = options
    const isManager = roles.includes(Role.MANAGER)

    const getOptions: GetManyOptions<UserEntity> = {
      take,
      skip,
      filter: {},
      orderBy: { firstName: 'ASC' }
    }

    if (!isManager) {
      Object.assign(getOptions, { filter: { isActive: true } })
    }

    if (search) {
      getOptions.search = {
        value: search,
        fields: ['id', 'firstName', 'lastName', 'email']
      }
    }

    const { items, total } = await this.repository.getMany(getOptions)
    return { users: items, total }
  }
}
