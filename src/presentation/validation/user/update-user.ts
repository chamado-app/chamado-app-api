import { PartialType } from '@nestjs/mapped-types'
import { IsString, Length, ValidateIf } from 'class-validator'

import { CreateUserValidated } from './create-user'

export class UpdateUserValidated extends PartialType(CreateUserValidated) {
  @ValidateIf((_, value) => !!value)
  @IsString({ message: 'A senha deve ser uma string' })
  @Length(8, 60, { message: 'A senha deve ter de 8 a 60 caracteres' })
  password: string
}
