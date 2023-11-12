import { IsIn, IsNotEmpty } from 'class-validator'

import { TicketStatus } from '@/domain/entities'

export class UpdateTicketValidated {
  @IsNotEmpty({ message: 'O status é obrigatório' })
  @IsIn(Object.values(TicketStatus), { message: 'Informe um status valido' })
  status: TicketStatus
}
