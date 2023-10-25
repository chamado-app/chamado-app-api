import * as bcrypt from 'bcrypt'

import { type HashComparer, type HashGenerator } from '@/domain/contracts'

export class BcryptAdapter implements HashComparer, HashGenerator {
  constructor(private readonly salt = 10) {}

  async compare(value: string, hashedValue: string): Promise<boolean> {
    return await bcrypt.compare(value, hashedValue)
  }

  async generate(value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }
}
