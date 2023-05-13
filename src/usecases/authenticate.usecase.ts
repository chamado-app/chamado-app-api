import { Injectable, NotFoundException } from '@nestjs/common'
import { type Observable, map, of, switchMap } from 'rxjs'
import { type UseCase } from 'src/core/base/usecase'
import { TokenEntity } from 'src/core/domain/entities/token.entity'
import { type UserEntity } from 'src/core/domain/entities/user.entity'
import { AuthenticateMapper } from 'src/core/domain/mappers/authenticate.mapper'
import { AuthenticatedMapper } from 'src/core/domain/mappers/authenticated.mapper'
import { TokenRepository } from 'src/core/repositories/token.repository'
import { UserRepository } from 'src/core/repositories/user.repository'
import { type AuthenticateDto } from 'src/shared/dtos/authenticate.dto'
import { type AuthenticatedDto } from 'src/shared/dtos/authenticated.dto'

@Injectable()
export class AuthenticateUseCase implements UseCase<AuthenticatedDto> {
  private readonly authenticateMapper: AuthenticateMapper
  private readonly authenticatedMapper: AuthenticatedMapper

  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository
  ) {
    this.authenticateMapper = new AuthenticateMapper()
    this.authenticatedMapper = new AuthenticatedMapper()
  }

  execute(credentials: AuthenticateDto): Observable<AuthenticatedDto> {
    const entity = this.authenticateMapper.mapFrom(credentials)

    return this.userRepository
      .getOne(entity)
      .pipe(switchMap(this.validateUser))
      .pipe(switchMap(this.createToken.bind(this)))
      .pipe(map(this.authenticatedMapper.mapTo))
  }

  private validateUser(user?: UserEntity): Observable<UserEntity> {
    if (!user) throw new NotFoundException()

    return of(user)
  }

  private createToken(user: UserEntity): Observable<TokenEntity> {
    const token = new TokenEntity()
    token.token = Math.random().toString()
    token.type = 'Bearer'
    token.user = user

    return this.tokenRepository.create(token)
  }
}
