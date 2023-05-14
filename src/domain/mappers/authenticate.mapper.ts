import { Mapper } from '@/domain/base'
import { AuthenticateDto } from '@/domain/dtos'
import { UserEntity } from '@/domain/entities'

export class AuthenticateMapper extends Mapper<AuthenticateDto, UserEntity> {
  mapFrom(data: AuthenticateDto): UserEntity {
    const user = new UserEntity()

    user.email = data.email
    user.password = data.password

    return user
  }

  mapTo(user: UserEntity): AuthenticateDto {
    const data = new AuthenticateDto()

    data.email = user.email
    data.email = ''

    return data
  }
}
