import { faker } from '@tests/__helpers__'

import { TokenType } from '@/domain/entities'
import { type AuthenticatedDto } from '@/shared/dtos'

export const mockAuthenticatedDto = (): AuthenticatedDto => ({
  type: faker.helpers.arrayElement(Object.values(TokenType)),
  accessToken: faker.string.uuid()
})
