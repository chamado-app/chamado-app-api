import { faker } from '@/__mocks__'
import { type TokenEntity, TokenType } from '@/domain/entities'

import { mockUserEntity } from './user-entity.mock'

export const mockTokenEntity = (): TokenEntity => ({
  id: faker.string.uuid(),
  token: faker.string.nanoid(),
  type: faker.helpers.arrayElement(Object.values(TokenType)),
  user: mockUserEntity()
})
