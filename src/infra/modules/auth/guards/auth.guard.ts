import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { type Request } from 'express'

import { Role, type RoleEntity, TokenType } from '@/domain/entities'
import { UserRepository } from '@/domain/repositories'
import { config } from '@/infra'
import { ROLES_KEY } from '@/presentation/decorators'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (this.isOnlyGuest(requiredRoles)) return true

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) throw new UnauthorizedException()

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: config.app.jwtSecret
      })

      if (!payload) throw new UnauthorizedException()

      const user = await this.userRepository.getByIdWithRoles(payload.id)

      if (!user || !this.isValidUserRoles(requiredRoles, user.roles)) {
        throw new UnauthorizedException()
      }

      request.user = user
    } catch {
      throw new UnauthorizedException()
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

  private isValidUserRoles(roles: Role[], userRoles: RoleEntity[]): boolean {
    return roles.some((role) =>
      userRoles.some((userRole) => userRole.name === role)
    )
  }
}
