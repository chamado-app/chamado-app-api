import { Mapper } from 'src/core/base/mapper'
import { type AuthenticateDto } from 'src/shared/dtos/authenticate.dto'

import { UserEntity } from '../entities/user.entity'

export class AuthenticateMapper extends Mapper<AuthenticateDto, UserEntity> {
  mapFrom(data: AuthenticateDto): UserEntity {
    const user = new UserEntity()

    user.email = data.email
    user.password = data.password

    return user
  }

  mapTo(user: UserEntity): AuthenticateDto {
    throw new Error('Method not implemented.')
  }
}
