import { type UserEntity } from '@/domain/entities'

export class ChangeTicketAssignedInputDto {
  constructor(readonly assignedToId: UserEntity['id']) {}
}
