import * as bcrypt from 'bcrypt'
import { type Observable, from } from 'rxjs'

import { type HashComparer, type HashGenerator } from '@/domain/contracts'

export class BcryptAdapter implements HashComparer, HashGenerator {
  constructor(private readonly salt: number = 10) {}

  compare(value: string, hashedValue: string): Observable<boolean> {
    return from(bcrypt.compare(value, hashedValue))
  }

  generate(value: string): Observable<string> {
    return from(bcrypt.hash(value, this.salt))
  }
}
