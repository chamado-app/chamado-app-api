import { Repository } from '@/domain/base'
import { type Role, type RoleEntity } from '@/domain/entities'

export abstract class RoleRepository extends Repository<RoleEntity> {
  abstract getManyByName(names: Role[]): Promise<RoleEntity[]>
}
