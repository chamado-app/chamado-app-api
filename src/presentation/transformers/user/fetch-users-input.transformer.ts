import { FetchUsersInputDto } from '@/domain/dtos'
import { type FetchUsersValidated } from '@/presentation/validation'

export class FetchUsersInputTransformer {
  static mapFrom(data: FetchUsersValidated): FetchUsersInputDto {
    return new FetchUsersInputDto(data.showRoles)
  }
}
