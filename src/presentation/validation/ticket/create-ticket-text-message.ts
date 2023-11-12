import { IsNotEmpty, Length } from 'class-validator'

export class CreateTicketTextMessageValidated {
  @IsNotEmpty({ message: 'O campo mensagem não pode ser vazio' })
  @Length(2, 1024, {
    message: 'O campo mensagem deve ter entre 2 e 1024 caracteres'
  })
  text: string
}
