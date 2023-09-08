import { type Observable } from 'rxjs'

export abstract class HashGenerator {
  generate: (value: string) => Observable<string>
}
