import { faker } from '@tests/__helpers__'

import { type AuthenticateDto } from '@/shared/dtos'

export const mockAuthenticateDto = (): AuthenticateDto => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
