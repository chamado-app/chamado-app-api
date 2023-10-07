import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  ValidateIf
} from 'class-validator'

import { type CategoryEntity } from '@/domain/entities'

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @IsString({ message: 'O nome deve ser uma string' })
  @Length(3, 60, { message: 'O nome deve ter de 3 a 60 caracteres' })
  name: string

  @ValidateIf((_, value) => value !== undefined)
  @IsString({ message: 'A descrição deve ser uma string' })
  description?: string

  @ValidateIf((_, value) => value !== undefined)
  @IsBoolean()
  isActive?: boolean

  @ValidateIf((_, value) => value !== undefined)
  @IsUUID(4, { message: 'O id deve ser uma categoria válida' })
  parentId?: CategoryEntity['id']
}
