import { UnauthorizedException } from '@nestjs/common'

import { type Usecase } from '@/domain/base'
import type { HashComparer, JwtGenerator } from '@/domain/contracts'
import { type AuthenticateInputDto } from '@/domain/dtos'
import { TokenEntity, TokenType, type UserEntity } from '@/domain/entities'
import type { TokenRepository, UserRepository } from '@/domain/repositories'

export class AuthenticateUsecase implements Usecase<TokenEntity> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly hashComparer: HashComparer,
    private readonly jwtGenerator: JwtGenerator
  ) {}

  async execute(data: AuthenticateInputDto): Promise<TokenEntity> {
    const user = await this.userRepository.getOne({
      filter: { email: data.email, isActive: true }
    })

    if (!user) throw new UnauthorizedException()

    await this.compare(data, user)
    return await this.generateToken(user)
  }

  private async compare(
    data: AuthenticateInputDto,
    user: UserEntity
  ): Promise<void> {
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

    await this.tokenRepository.delete({ user, type: TokenType.JWT }, true)
    return await this.tokenRepository.create(entity)
  }
}
