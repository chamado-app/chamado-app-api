import { type Usecase } from '@/domain/base'
import { type FetchUsersInputDto } from '@/domain/dtos'
import { type UserEntity } from '@/domain/entities'
import { type UserRepository } from '@/domain/repositories'

export class FetchUsersUsecase implements Usecase<UserEntity[]> {
  constructor(private readonly repository: UserRepository) {}

  async execute(filter: FetchUsersInputDto): Promise<UserEntity[]> {
    return this.repository.fetchUsers(filter)
  }
}
