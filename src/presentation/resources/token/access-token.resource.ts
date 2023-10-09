import { type TokenEntity } from '@/domain/entities'

export class AccessTokenShow {
  private constructor(
    readonly type: TokenEntity['type'],
    readonly accessToken: TokenEntity['token']
  ) {}

  static mapTo(token: TokenEntity): AccessTokenShow {
    return new AccessTokenShow(token.type, token.token)
  }
}
