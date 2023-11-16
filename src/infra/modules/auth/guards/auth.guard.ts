import {
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { type Request } from 'express'

import { JwtVerifier } from '@/domain/contracts'
import {
  Role,
  type RoleEntity,
  TokenType,
  type UserEntity
} from '@/domain/entities'
import { UserRepository } from '@/domain/repositories'
import { ROLES_KEY } from '@/presentation/decorators'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtVerifier: JwtVerifier,
    private readonly userRepository: UserRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (this.isOnlyGuest(requiredRoles)) return true

    const request = context
      .switchToHttp()
      .getRequest<Request & { user: UserEntity }>()

    try {
      const token = this.extractTokenFromHeader(request)
      if (!token) throw new UnauthorizedException()

      const payload = await this.jwtVerifier.verify(token)
      if (!payload) throw new UnauthorizedException()

      const user = await this.userRepository.getByIdWithAuthorization(
        payload.id
      )
      if (!user) throw new UnauthorizedException()

      if (!this.isValidUserRoles(requiredRoles, user.roles))
        throw new ForbiddenException()

      if (!this.isValidUserAuthorization(user, token))
        throw new UnauthorizedException()

      request.user = user
    } catch (exception) {
      throw exception instanceof UnauthorizedException ||
        exception instanceof ForbiddenException
        ? exception
        : new UnauthorizedException()
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === TokenType.JWT ? token : undefined
  }

  private isOnlyGuest(roles: Role[]): boolean {
    return roles.length === 1 && roles[0] === Role.GUEST
  }

  private isValidUserAuthorization(user: UserEntity, token: string): boolean {
    const tokens = user.tokens?.filter((token) => token.type === TokenType.JWT)
    if (!tokens?.length) return false
    const [userToken] = tokens
    return userToken.token === token
  }

  private isValidUserRoles(roles: Role[], userRoles: RoleEntity[]): boolean {
    return roles.some((role) =>
      userRoles.some((userRole) => userRole.name === role)
    )
  }
}
