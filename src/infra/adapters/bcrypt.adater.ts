import * as bcrypt from 'bcrypt'
import { type Observable, from } from 'rxjs'

import { type HashComparer } from '@/domain/contracts'

export class BcryptAdapter implements HashComparer {
  compare(value: string, hashedValue: string): Observable<boolean> {
    return from(bcrypt.compare(value, hashedValue))
  }
}
