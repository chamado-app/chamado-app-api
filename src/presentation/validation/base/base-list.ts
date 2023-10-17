import { IsNumberString, IsOptional } from 'class-validator'

export class BaseListValidated {
  @IsOptional()
  @IsNumberString({}, { message: 'O parametro skip deve ser um número.' })
  take?: number

  @IsOptional()
  @IsNumberString({}, { message: 'O parametro take deve ser um número.' })
  skip?: number
}
