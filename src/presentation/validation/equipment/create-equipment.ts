import {
  IsIn,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateIf
} from 'class-validator'

import { EquipmentStatus } from '@/domain/entities'

export class CreateEquipmentValidated {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  @MaxLength(80, { message: 'O nome deve ter no maximo 80 caracteres' })
  name: string

  @IsNotEmpty({ message: 'A marca é obrigatória' })
  @IsString({ message: 'A marca deve ser uma string' })
  @MaxLength(80, { message: 'A marca deve ter no maximo 80 caracteres' })
  brand: string

  @IsNotEmpty({ message: 'O modelo é obrigatório' })
  @IsString({ message: 'O modelo deve ser uma string' })
  @MaxLength(80, { message: 'O modelo deve ter no maximo 80 caracteres' })
  model: string

  @IsNotEmpty({ message: 'O tipo é obrigatório' })
  @IsString({ message: 'O tipo deve ser uma string' })
  @MaxLength(60, { message: 'O tipo deve ter no maximo 60 caracteres' })
  type: string

  @IsNotEmpty({ message: 'A seção é obrigatória' })
  @IsString({ message: 'A seção deve ser uma string' })
  @MaxLength(60, { message: 'A seção deve ter no maximo 60 caracteres' })
  section: string

  @ValidateIf((_, value) => !!value)
  @IsString({ message: 'O serial deve ser uma string' })
  @MaxLength(60, { message: 'O serial deve ter no maximo 60 caracteres' })
  serial?: string

  @ValidateIf((_, value) => !!value)
  @IsString({ message: 'O património deve ser uma string' })
  @MaxLength(60, { message: 'O património deve ter no maximo 60 caracteres' })
  patrimony?: string

  @ValidateIf((_, value) => !!value)
  @IsString({ message: 'As informações adicionais devem ser uma string' })
  @MaxLength(255, {
    message: 'As informações adicionais devem ter no maximo 255 caracteres'
  })
  additionalInfo?: string

  @IsNotEmpty({ message: 'O status é obrigatório' })
  @IsIn(Object.values(EquipmentStatus), { message: 'Informe um status valido' })
  status: EquipmentStatus
}
