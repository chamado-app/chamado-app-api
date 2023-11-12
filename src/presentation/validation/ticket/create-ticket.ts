import { IsNotEmpty, IsUUID, MaxLength } from 'class-validator'

export class CreateTicketValidated {
  @IsNotEmpty({ message: 'O título é obrigatório' })
  @MaxLength(120, { message: 'o título deve ter no máximo 120 caracteres' })
  title: string

  @IsNotEmpty({ message: 'A mensagem é obrigatória' })
  @MaxLength(1024, { message: 'A mensagem deve ter no máximo 1024 caracteres' })
  message: string

  @IsNotEmpty({ message: 'A categoria é obrigatória' })
  @IsUUID('4', { message: 'A categoria deve ser um UUID' })
  categoryId: string

  @IsNotEmpty({ message: 'O equipamento é obrigatório' })
  @IsUUID('4', { message: 'O equipamento deve ser um UUID' })
  equipmentId: string
}
