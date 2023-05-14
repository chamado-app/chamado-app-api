import { type Observable } from 'rxjs'

export abstract class HashComparer {
  compare: (value: string, hashedValue: string) => Observable<boolean>
}
