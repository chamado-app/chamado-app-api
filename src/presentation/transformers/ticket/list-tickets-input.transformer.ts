import { ListTicketsInputDto } from '@/domain/dtos'
import { type UserEntity } from '@/domain/entities'
import { type ListTicketsValidated } from '@/presentation/validation'

export class ListTicketsInputTransformer {
  static mapFrom(
    data: ListTicketsValidated,
    authenticatedUser: UserEntity
  ): ListTicketsInputDto {
    return new ListTicketsInputDto(
      data.take,
      data.skip,
      authenticatedUser,
      data.search
    )
  }
}
