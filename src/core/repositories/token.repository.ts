import { Repository } from '../base/repository'
import { type TokenEntity } from '../domain/entities/token.entity'

export abstract class TokenRepository extends Repository<TokenEntity> {}
