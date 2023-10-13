import {
  type CanActivate,
  type ExecutionContext,
  Injectable
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { type Role, type UserEntity } from '@/domain/entities'
import { ROLES_KEY } from '@/presentation/decorators'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (!requiredRoles) return true

    const request = context.switchToHttp().getRequest()
    const user: UserEntity = request.user
    return requiredRoles.some((requiredRole) =>
      user.roles.some(({ name: userRole }) => userRole === requiredRole)
    )
  }
}
