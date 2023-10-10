import { IsEmail, IsNotEmpty } from 'class-validator'

export class AuthenticateValidated {
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  email: string

  @IsNotEmpty({ message: 'Informe uma senha' })
  password: string
}
