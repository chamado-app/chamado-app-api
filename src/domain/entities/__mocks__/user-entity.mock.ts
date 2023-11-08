import { faker } from '@/__mocks__'
import { type UserEntity } from '@/domain/entities'

export const mockUserEntity = (): UserEntity => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  roles: [],
  sectors: [],
  isActive: true,
  updatedAt: faker.date.past(),
  createdAt: faker.date.past(),
  deletedAt: null
})
