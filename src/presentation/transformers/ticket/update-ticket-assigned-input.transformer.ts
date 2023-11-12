import { ChangeTicketAssignedInputDto } from '@/domain/dtos'
import { type UpdateTicketAssignedValidated } from '@/presentation/validation'

export class UpdateTicketAssignedTransformer {
  static mapFrom(
    data: UpdateTicketAssignedValidated
  ): ChangeTicketAssignedInputDto {
    return new ChangeTicketAssignedInputDto(data.assignedToId)
  }
}
