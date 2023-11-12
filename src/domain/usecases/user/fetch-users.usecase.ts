import { type GetManyOptions, type Usecase } from '@/domain/base'
import { type UserEntity } from '@/domain/entities'
import { type UserRepository } from '@/domain/repositories'

export class FetchUsersUsecase implements Usecase<UserEntity[]> {
  constructor(private readonly repository: UserRepository) {}

  async execute(): Promise<UserEntity[]> {
    const getOptions: GetManyOptions<UserEntity> = {
      filter: { isActive: true },
      orderBy: { firstName: 'ASC', lastName: 'ASC' }
    }

    const { items: users } = await this.repository.getMany(getOptions)
    return users
  }
}
