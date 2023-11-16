import { IsArray, IsIn, ValidateIf } from 'class-validator'

import { Role } from '@/domain/entities'

export class FetchUsersValidated {
  @ValidateIf((_, value) => !!value)
  @IsArray({ message: 'A lista de papeis deve ser um array' })
  @IsIn(Object.values(Role), {
    each: true,
    message: 'Informe uma lista de papeis válidos'
  })
  showRoles?: Role[]
}
