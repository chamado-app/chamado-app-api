import { type Faker } from '@faker-js/faker'
import { setSeederFactory } from 'typeorm-extension'

import { PgUserEntity } from '../entities'

setSeederFactory(PgUserEntity, (faker: Faker) => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()

  return {
    firstName,
    lastName,
    isActive: true,
    email: faker.internet
      .email({
        firstName,
        lastName,
        allowSpecialCharacters: false,
        provider: 'gmail.com'
      })
      .toLowerCase(),
    password: faker.internet.password({
      length: 8,
      memorable: true
    })
  }
})
