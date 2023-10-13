import { Repository } from '@/domain/base'
import { type RoleEntity } from '@/domain/entities'

export abstract class RoleRepository extends Repository<RoleEntity> {}
