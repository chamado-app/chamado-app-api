import { IsNotEmpty, IsUUID } from 'class-validator'

export class UpdateTicketAssignedValidated {
  @IsNotEmpty({ message: 'O responsável deve ser informado' })
  @IsUUID('4', { message: 'O responsável deve ser um UUID' })
  assignedToId: string
}
