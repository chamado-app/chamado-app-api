import { faker } from '@tests/__helpers__'

import { mockUserEntity } from './user-entity.mock'

import { type TokenEntity, TokenType } from '@/domain/entities'

export const mockTokenEntity = (): TokenEntity => ({
  id: faker.string.uuid(),
  token: faker.string.nanoid(),
  type: faker.helpers.arrayElement(Object.values(TokenType)),
  user: mockUserEntity()
})
