import { type Faker } from '@faker-js/faker'
import { setSeederFactory } from 'typeorm-extension'

import { PgUserEntity } from '../entities'

setSeederFactory(PgUserEntity, (faker: Faker) => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()

  return {
    firstName,
    lastName,
    email: `${firstName}.${lastName}@chamado.app`
      .replace(' ', '.')
      .toLowerCase(),
    password: faker.internet.password({ memorable: true, length: 8 }),
    isActive: true
  }
})
