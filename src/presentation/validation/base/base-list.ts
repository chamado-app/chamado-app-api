import { IsNumberString, IsOptional, IsString } from 'class-validator'

export class BaseListValidated {
  @IsOptional()
  @IsNumberString({}, { message: 'O parametro skip deve ser um número.' })
  take?: number

  @IsOptional()
  @IsNumberString({}, { message: 'O parametro take deve ser um número.' })
  skip?: number

  @IsOptional()
  @IsString({ message: 'O parametro search deve ser uma string.' })
  search?: string
}
