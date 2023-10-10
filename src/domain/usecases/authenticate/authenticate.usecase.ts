import { UnauthorizedException } from '@nestjs/common'

import { type Usecase } from '@/domain/base'
import type { HashComparer, JwtGenerator } from '@/domain/contracts'
import { TokenEntity, TokenType, type UserEntity } from '@/domain/entities'
import type { TokenRepository, UserRepository } from '@/domain/repositories'
import { type AuthenticateInputDto } from '@/presentation/resources'

export class AuthenticateUsecase implements Usecase<TokenEntity> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly hashComparer: HashComparer,
    private readonly jwtGenerator: JwtGenerator
  ) {}

  async execute(data: AuthenticateInputDto): Promise<TokenEntity> {
    const user = await this.userRepository.getOne({
      email: data.email,
      isActive: true
    })
    await this.compare(user)
    return await this.generateToken(user)
  }

  private async compare(data: UserEntity, user?: UserEntity): Promise<void> {
    if (!user) throw new UnauthorizedException()
    const isValid = await this.hashComparer.compare(
      data.password,
      user.password
    )
    if (!isValid) throw new UnauthorizedException()
  }

  private async generateToken(user: UserEntity): Promise<TokenEntity> {
    const token = await this.jwtGenerator.generate({ id: user.id })
    return await this.saveToken(token, user)
  }

  private async saveToken(
    token: string,
    user: UserEntity
  ): Promise<TokenEntity> {
    const entity = new TokenEntity()
    entity.type = TokenType.JWT
    entity.token = token
    entity.user = user

    await this.tokenRepository.delete({ user, type: TokenType.JWT })
    return await this.tokenRepository.create(entity)
  }
}