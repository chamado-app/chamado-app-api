import {
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf
} from 'class-validator'

export class BaseListValidated {
  @IsOptional()
  @IsNumberString({}, { message: 'O parametro skip deve ser um número.' })
  take?: number

  @IsOptional()
  @IsNumberString({}, { message: 'O parametro take deve ser um número.' })
  skip?: number

  @ValidateIf(({ search }) => !!search)
  @IsString({ message: 'O parametro search deve ser uma string.' })
  @MinLength(3, {
    message: 'O parametro search deve ter pelo menos 3 caracteres.'
  })
  search?: string
}
