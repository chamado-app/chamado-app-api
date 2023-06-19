import { faker } from '@tests/__helpers__'

import { type UserEntity } from '@/domain/entities'

export const mockUserEntity = (): UserEntity => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  isActive: true,
  updatedAt: faker.date.past(),
  createdAt: faker.date.past()
})
