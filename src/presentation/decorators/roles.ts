import { type CustomDecorator, SetMetadata } from '@nestjs/common'

import { Role } from '@/domain/entities'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: Role[]): CustomDecorator<string> =>
  SetMetadata(ROLES_KEY, roles)

export const ManagerRole = (): CustomDecorator<string> => Roles(Role.MANAGER)

export const TechnicianRole = (): CustomDecorator<string> =>
  Roles(Role.TECHNICIAN)

export const UserRole = (): CustomDecorator<string> => Roles(Role.USER)

export const GuestRole = (): CustomDecorator<string> => Roles(Role.GUEST)

export const AuthenticatedRoles = (): CustomDecorator<string> =>
  Roles(Role.MANAGER, Role.TECHNICIAN, Role.USER)

export const OperationalRoles = (): CustomDecorator<string> =>
  Roles(Role.MANAGER, Role.TECHNICIAN)
