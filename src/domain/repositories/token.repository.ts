import { Repository } from '@/domain/base'
import { type TokenEntity } from '@/domain/entities'

export abstract class TokenRepository extends Repository<TokenEntity> {}
