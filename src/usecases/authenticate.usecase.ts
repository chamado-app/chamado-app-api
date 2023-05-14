import { NotFoundException } from '@nestjs/common'
import { type Observable, map, of, switchMap } from 'rxjs'

import { type UseCase } from '@/domain/base'
import type { AuthenticateDto, AuthenticatedDto } from '@/domain/dtos'
import { TokenEntity, type UserEntity } from '@/domain/entities'
import { AuthenticateMapper, AuthenticatedMapper } from '@/domain/mappers'
import {
  type TokenRepository,
  type UserRepository
} from '@/domain/repositories'

export class AuthenticateUseCase implements UseCase<AuthenticatedDto> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly authenticateMapper = new AuthenticateMapper(),
    private readonly authenticatedMapper = new AuthenticatedMapper()
  ) {}

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
