import { type TokenEntity } from '@/domain/entities'

export class AuthenticateOutputDto {
  constructor(
    readonly type: TokenEntity['type'],
    readonly accessToken: TokenEntity['token']
  ) {}
}
