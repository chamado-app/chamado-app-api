import { Repository } from '@/domain/base'
import { type FetchUsersInputDto } from '@/domain/dtos'
import { type UserEntity } from '@/domain/entities'

export abstract class UserRepository extends Repository<UserEntity> {
  getByIdWithAuthorization: (id: UserEntity['id']) => Promise<UserEntity | null>
  fetchUsers: (data: FetchUsersInputDto) => Promise<UserEntity[]>
}
