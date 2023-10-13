import { setSeederFactory } from 'typeorm-extension'

import { PgUserEntity } from '../entities'

setSeederFactory(PgUserEntity, () => {
  return {
    firstName: 'Chamado.app',
    lastName: 'Admin',
    email: 'admin@chamado.app',
    password: '$2b$10$n6qEASeoEizrPhqXtGBRgu9qGqzCokuWLXkl8wCI6z7dBQ72SKf0K',
    isActive: true
  }
})
