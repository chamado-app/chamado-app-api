import { ShowTicketInputDto } from '@/domain/dtos'
import { type UserEntity } from '@/domain/entities'

export class ShowTicketInputTransformer {
  static mapFrom(
    id: string,
    authenticatedUser: UserEntity
  ): ShowTicketInputDto {
    return new ShowTicketInputDto(id, authenticatedUser)
  }
}
