import { type Observable } from 'rxjs'

export abstract class JwtGenerator {
  generate: (payload: Record<string, string>) => Observable<string>
}
