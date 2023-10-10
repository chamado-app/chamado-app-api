import { faker } from '@tests/__helpers__'

import { type AuthenticateValidated } from '@/presentation/validation'

export const mockAuthenticateValidated = (): AuthenticateValidated => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
