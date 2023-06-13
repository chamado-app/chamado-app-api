import { Faker, base, en, pt_BR as ptBR } from '@faker-js/faker'

export const faker = new Faker({ locale: [ptBR, en, base] })
