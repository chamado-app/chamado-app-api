import { type TokenType } from '@/domain/entities'

export class AuthenticatedDto {
  accessToken: string
  type: TokenType
}
