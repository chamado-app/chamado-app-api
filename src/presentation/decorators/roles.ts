import { type CustomDecorator, SetMetadata } from '@nestjs/common'

import { Role } from '@/domain/entities'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: Role[]): CustomDecorator =>
  SetMetadata(ROLES_KEY, roles)

export const ManagerRole = (): CustomDecorator => Roles(Role.MANAGER)

export const TechnicianRole = (): CustomDecorator => Roles(Role.TECHNICIAN)

export const UserRole = (): CustomDecorator => Roles(Role.USER)

export const GuestRole = (): CustomDecorator => Roles(Role.GUEST)

export const AuthenticatedRoles = (): CustomDecorator =>
  Roles(Role.MANAGER, Role.TECHNICIAN, Role.USER)

export const OperationalRoles = (): CustomDecorator =>
  Roles(Role.MANAGER, Role.TECHNICIAN)
