import { NotFoundException, UnauthorizedException } from '@nestjs/common'
import { type Observable, map, switchMap } from 'rxjs'

import { type Usecase } from '@/domain/base'
import type { HashComparer, JwtGenerator } from '@/domain/contracts'
import type { AuthenticateDto, AuthenticatedDto } from '@/domain/dtos'
import { TokenEntity, type UserEntity } from '@/domain/entities'
import { AuthenticateMapper, AuthenticatedMapper } from '@/domain/mappers'
import {
  type TokenRepository,
  type UserRepository
} from '@/domain/repositories'

export class AuthenticateUsecase implements Usecase<AuthenticatedDto> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly hashComparer: HashComparer,
    private readonly jwtGenerator: JwtGenerator,
    private readonly authenticateMapper = new AuthenticateMapper(),
    private readonly authenticatedMapper = new AuthenticatedMapper()
  ) {}

  execute(credentials: AuthenticateDto): Observable<AuthenticatedDto> {
    const data = this.authenticateMapper.mapFrom(credentials)

    return this.userRepository
      .getOne({ email: data.email, isActive: true })
      .pipe(switchMap((user) => this.compare(data, user)))
      .pipe(switchMap((user) => this.generateToken(user)))
      .pipe(map(this.authenticatedMapper.mapTo))
  }

  private compare(data: UserEntity, user?: UserEntity): Observable<UserEntity> {
    if (!user) throw new NotFoundException()

    const result = (isValid: boolean): UserEntity => {
      if (!isValid) throw new UnauthorizedException()
      return user
    }

    return this.hashComparer
      .compare(data.password, user.password)
      .pipe(map(result))
  }

  private generateToken(user: UserEntity): Observable<TokenEntity> {
    const save = (token: string): Observable<TokenEntity> => {
      return this.saveToken(token, user)
    }

    return this.jwtGenerator.generate({ id: user.id }).pipe(switchMap(save))
  }

  private saveToken(token: string, user: UserEntity): Observable<TokenEntity> {
    const entity = new TokenEntity()
    entity.type = 'Bearer'
    entity.token = token
    entity.user = user

    return this.tokenRepository.create(entity)
  }
}
