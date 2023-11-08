import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  IsArray,
  IsIn,
  IsUUID,
  ValidateIf,
  IsBoolean
} from 'class-validator'

import { Role, type CategoryEntity } from '@/domain/entities'

export class CreateUserValidated {
  @IsNotEmpty({ message: 'O primeiro nome não pode estar vazio' })
  @IsString({ message: 'O primeiro nome deve ser uma string' })
  @Length(3, 60, { message: 'O primeiro nome deve ter de 3 a 60 caracteres' })
  firstName: string

  @IsNotEmpty({ message: 'O primeiro nome não pode estar vazio' })
  @IsString({ message: 'O primeiro nome deve ser uma string' })
  @Length(3, 60, { message: 'O primeiro nome deve ter de 3 a 60 caracteres' })
  lastName: string

  @IsEmail({}, { message: 'Informe um e-mail válido' })
  email: string

  @IsNotEmpty({ message: 'Informe uma senha' })
  @IsString({ message: 'A senha deve ser uma string' })
  @Length(8, 60, { message: 'A senha deve ter de 8 a 60 caracteres' })
  password: string

  @IsArray({ message: 'O usuário deve ter pelo menos uma permissão' })
  @IsIn(Object.values(Role), {
    each: true,
    message: 'Informe permissões válidas'
  })
  roles: Role[]

  @IsArray({ message: 'O usuário deve estar em ao menos um setor' })
  @IsUUID('4', { each: true, message: 'O setor deve ser um UUID válido' })
  sectors: Array<CategoryEntity['id']>

  @ValidateIf((_, value) => value !== undefined)
  @IsBoolean()
  isActive?: boolean
}
